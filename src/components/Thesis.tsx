const pillars = [
  {
    label: "01",
    title: "We bring operators.",
    body: "Term sheets are easy. Finding people who've built it before and putting them in the room is the actual job. That's our work.",
  },
  {
    label: "02",
    title: "We bring capital.",
    body: "Selective and concentrated. Sized against the operating work we're already doing inside the business.",
  },
  {
    label: "03",
    title: "We stick around.",
    body: "Most check-writers disappear after the wire hits. We're still in the room a year in, two years in, however long it takes.",
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
            We back the kind of companies we&apos;d start ourselves.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-[color:var(--muted)]">
            Pre-seed to Series A. We&apos;re not picky about sector. We&apos;re
            picky about founders.
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
