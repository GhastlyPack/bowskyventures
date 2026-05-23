const pillars = [
  {
    label: "01",
    title: "Operating expertise",
    body: "We don't just write checks. We embed alongside founders — recruiting, building systems, and running the playbooks we've run before.",
  },
  {
    label: "02",
    title: "Selective capital",
    body: "Equity in exchange for the cash, talent, and infrastructure to compress years of growth into quarters.",
  },
  {
    label: "03",
    title: "Long horizons",
    body: "We invest where we can stay involved. The work doesn't end at term sheet — it starts there.",
  },
];

export function Thesis() {
  return (
    <section
      id="approach"
      className="relative border-t border-[color:var(--border)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[color:var(--accent)] mb-6">
            What we look for
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-foreground">
            We back founders building businesses we&apos;d build ourselves.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-[color:var(--muted)]">
            Pre-seed through Series A. Sector-agnostic, with a bias toward
            real-world businesses where operational leverage compounds.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 transition-colors hover:border-[color:var(--accent)]/40"
            >
              <p className="font-mono text-xs tracking-[0.25em] text-[color:var(--accent)]">
                {p.label}
              </p>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
