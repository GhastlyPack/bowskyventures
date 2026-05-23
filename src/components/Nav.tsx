import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-[color:var(--border)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-mono text-sm tracking-[0.22em] uppercase text-foreground"
        >
          Bowsky <span className="text-[color:var(--accent)]">Ventures</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-[color:var(--muted)]">
          <a href="#about" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="#team" className="hover:text-foreground transition-colors">
            Team
          </a>
          <a href="#approach" className="hover:text-foreground transition-colors">
            Approach
          </a>
          <a href="#contact" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
        <a
          href="#contact"
          className="rounded-full border border-[color:var(--border)] bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
