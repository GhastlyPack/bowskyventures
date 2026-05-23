import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-[color:var(--border)] bg-[color:var(--surface)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-black">
              <Image
                src="/brandon-placeholder.svg"
                alt="Brandon Bowsky"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="mt-6 flex items-baseline justify-between">
              <div>
                <p className="text-foreground font-medium">Brandon Bowsky</p>
                <p className="text-sm text-[color:var(--muted)]">
                  Founder & Managing Partner
                </p>
              </div>
              <a
                href="https://www.linkedin.com/company/bowsky-ventures"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
              >
                LinkedIn →
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[color:var(--accent)] mb-6">
              About
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-foreground">
              Operator first.
              <br />
              <span className="text-[color:var(--muted)]">Investor second.</span>
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-[color:var(--muted)]">
              <p>
                Brandon has built companies, run them, and invested in them.
                Bowsky Ventures is what he started after the last one.
              </p>
              <p>
                The pattern he kept seeing was always the same. Founders with
                the vision, but no operating bench behind them. The studio
                exists to be that bench.
              </p>
              <p>
                We take equity. We bring capital and the team to deploy it
                alongside the founder. The goal is to get to the next milestone
                faster than they would alone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
