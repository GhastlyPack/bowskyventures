type Member = {
  initials: string;
  name: string;
  title: string;
  // TODO: populate as LinkedIn URLs come in
  linkedin?: string;
};

const members: Member[] = [
  {
    initials: "MM",
    name: "Matthew Melzer",
    title: "Chief Operating Officer",
  },
  {
    initials: "CR",
    name: "Cole Roemer",
    title: "Chief Business Officer",
  },
  {
    initials: "MK",
    name: "Michael Kuczynski",
    title: "Chief Technology Officer",
  },
  {
    initials: "MA",
    name: "Matthew Allison",
    title: "Chief Marketing Officer",
  },
];

export function Team() {
  return (
    <section
      id="team"
      className="relative border-t border-[color:var(--border)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[color:var(--accent)] mb-6">
            Team
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-foreground">
            The people doing the work.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-[color:var(--muted)]">
            Brandon runs the studio with a small leadership team. Each one has
            built companies before.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m) => (
            <MemberCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden transition-colors hover:border-[color:var(--accent)]/40">
      <div className="relative aspect-[4/5] w-full bg-black">
        <Avatar initials={member.initials} />
      </div>
      <div className="p-5 flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-foreground">{member.name}</p>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            {member.title}
          </p>
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
            aria-label={`${member.name} on LinkedIn`}
          >
            in →
          </a>
        )}
      </div>
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  const bgId = `avatar-bg-${initials}`;
  const glowId = `avatar-glow-${initials}`;
  return (
    <svg
      viewBox="0 0 200 250"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`Placeholder avatar for ${initials}`}
    >
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="#d4a24c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#d4a24c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="250" fill={`url(#${bgId})`} />
      <rect width="200" height="250" fill={`url(#${glowId})`} />
      <text
        x="100"
        y="135"
        textAnchor="middle"
        fontFamily="Geist, system-ui, sans-serif"
        fontSize="60"
        fontWeight={600}
        fill="#f5f5f4"
        letterSpacing="-2"
      >
        {initials}
      </text>
      <line
        x1="80"
        y1="160"
        x2="120"
        y2="160"
        stroke="#d4a24c"
        strokeWidth="1"
      />
    </svg>
  );
}
