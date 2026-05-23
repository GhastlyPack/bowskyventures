export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-[color:var(--muted)]">
          Bowsky <span className="text-[color:var(--accent)]">Ventures</span>
        </p>
        <p className="text-xs text-[color:var(--muted)]">
          © 2024–{new Date().getFullYear()} Bowsky Ventures. All rights
          reserved.
        </p>
        <div className="flex gap-6 text-xs text-[color:var(--muted)]">
          <a
            href="https://www.linkedin.com/company/bowsky-ventures"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
