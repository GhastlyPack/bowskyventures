const pillars = [
  {
    label: "01",
    title: "Proven operators",
    body: "With over 100 years of combined experience and billions of generated revenue. Anyone can win once. We've won many times, at scale, and want to win with you too.",
  },
  {
    label: "02",
    title: "Proven systems.",
    body: "We're experienced at building and leading machines to m&a events. From machines that have employed thousands to machines that have generated over $100m in a year — we've probably been there, done that, and can help you do it too.",
  },
  {
    label: "03",
    title: "We stick around.",
    body: "Most Venture firms disappear after the wire hits. We're exclusively here for the long haul. If we're with you, we're with you forever life (or until an exit).",
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
            Approach
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-foreground">
            We back businesses we&apos;d build…
          </h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-[color:var(--muted)]">
            <p>
              Regardless of where you are in your journey — we may want to
              help — but unlike most, we don&apos;t want worthless paper.
            </p>
            <p>We&apos;re picky (just like you should be).</p>
          </div>
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
