import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trackingHost() {
  const region = (process.env.CUSTOMERIO_REGION || "us").toLowerCase();
  return region === "eu" ? "https://track-eu.customer.io" : "https://track.customer.io";
}

function authHeader(siteId: string, apiKey: string) {
  const token = Buffer.from(`${siteId}:${apiKey}`).toString("base64");
  return `Basic ${token}`;
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, 200);
  const email = (body.email || "").trim().toLowerCase().slice(0, 254);
  const company = (body.company || "").trim().slice(0, 200);
  const message = (body.message || "").trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  const eventName = process.env.CUSTOMERIO_EVENT_NAME || "contact_form_submitted";

  if (!siteId || !apiKey) {
    console.error("Customer.io env vars missing (CUSTOMERIO_SITE_ID / CUSTOMERIO_API_KEY).");
    return NextResponse.json(
      { error: "Server is not configured to accept submissions yet." },
      { status: 503 }
    );
  }

  const host = trackingHost();
  const auth = authHeader(siteId, apiKey);
  const id = encodeURIComponent(email);
  const submittedAt = Math.floor(Date.now() / 1000);

  try {
    const identifyRes = await fetch(`${host}/api/v1/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        email,
        name,
        company: company || undefined,
        last_contact_form_at: submittedAt,
        source: "bowskyventures.com",
      }),
    });

    if (!identifyRes.ok) {
      const text = await identifyRes.text();
      console.error("Customer.io identify failed", identifyRes.status, text);
      return NextResponse.json(
        { error: "Could not record submission." },
        { status: 502 }
      );
    }

    const eventRes = await fetch(`${host}/api/v1/customers/${id}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        name: eventName,
        data: {
          name,
          email,
          company: company || null,
          message,
          source: "bowskyventures.com",
          submitted_at: submittedAt,
        },
      }),
    });

    if (!eventRes.ok) {
      const text = await eventRes.text();
      console.error("Customer.io event failed", eventRes.status, text);
      return NextResponse.json(
        { error: "Could not deliver submission." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Customer.io request error", err);
    return NextResponse.json(
      { error: "Network error reaching submissions service." },
      { status: 502 }
    );
  }
}
