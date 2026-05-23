export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,162,76,0.15),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#050505_85%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-32 md:pt-40 md:pb-48">
        <div className="fade-up max-w-4xl">
          <p className="mb-8 font-mono text-xs tracking-[0.3em] uppercase text-[color:var(--accent)]">
            Bowsky Ventures
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.02] tracking-tight text-foreground">
            We build companies better, faster,
            <br />
            <span className="text-[color:var(--muted)]">
              With billions in proven results.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--muted)]">
            Bowsky Ventures is a unique venture studio that acts as a growth
            accelerator. We partner with early stage and growth stage
            businesses to build with them and do it better, faster.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-[color:var(--accent)] transition-colors"
            >
              Get in touch
            </a>
            <a
              href="#about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--border)] px-7 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors"
            >
              About Brandon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
