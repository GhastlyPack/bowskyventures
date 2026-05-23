"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim().toLowerCase(),
      company: String(formData.get("company") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error || "Something went wrong. Try again.");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-[color:var(--border)] bg-[color:var(--surface)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[color:var(--accent)] mb-6">
              Contact
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-foreground">
              Building something?
              <br />
              <span className="text-[color:var(--muted)]">Let&apos;s talk.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[color:var(--muted)]">
              The best way to reach us is through this form. We read everything
              and respond to founders we think we can help.
            </p>
          </div>

          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="rounded-2xl border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 p-10 text-center">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-[color:var(--accent)] mb-4">
                  Message received
                </p>
                <p className="text-xl text-foreground">
                  Thanks for reaching out. We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <Field
                  label="Company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                />
                <FieldTextarea
                  label="What are you working on?"
                  name="message"
                  required
                  rows={5}
                />

                {status === "error" && errorMsg && (
                  <p className="text-sm text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-background hover:bg-[color:var(--accent)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: FieldProps) {
  return (
    <label className="block">
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--muted)]">
        {label}
        {required && <span className="text-[color:var(--accent)]"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 block w-full rounded-lg border border-[color:var(--border)] bg-black/40 px-4 py-3 text-foreground placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--accent)] transition-colors"
      />
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  required,
  rows = 4,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--muted)]">
        {label}
        {required && <span className="text-[color:var(--accent)]"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        className="mt-2 block w-full rounded-lg border border-[color:var(--border)] bg-black/40 px-4 py-3 text-foreground placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--accent)] transition-colors resize-y"
      />
    </label>
  );
}
