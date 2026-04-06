import GraphCanvas from "./GraphCanvas";

const GITHUB_URL = "https://github.com/seidrum/seidrum";

const CARDS = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Knowledge Graph",
    desc: "Entities, facts, and relationships with temporal confidence. Your digital life as a living web — not a chat log.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "Autonomous Agents",
    desc: "Persistent consciousness streams that observe, reason, and act. Not request-response — always thinking.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: "Open by Design",
    desc: "Everything is a plugin over NATS events. REST & WebSocket API — build in any language, connect anything.",
  },
];

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#06020f] flex flex-col items-center justify-center selection:bg-violet-500/30">
      {/* Animated knowledge graph */}
      <GraphCanvas />

      {/* Radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#06020f_75%)]" />

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-4xl">
        {/* Logo icon */}
        <img src="/seidrum-icon.svg" alt="" className="animate-fade-up mb-6 h-20 w-20 sm:h-24 sm:w-24 drop-shadow-[0_0_24px_rgba(129,140,248,0.3)]" />

        {/* Pronunciation + identity */}
        <div className="animate-fade-up mb-4 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/25">
            /say-drum/
          </span>
          <span className="hidden sm:inline-block h-px w-8 bg-white/10 animate-draw-in" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-violet-400/50">
            Old Norse: seeing hidden connections
          </span>
        </div>

        {/* Heading */}
        <h1 className="animate-fade-up-delay-1 text-center text-[clamp(2.8rem,10vw,7rem)] font-black tracking-[-0.03em] leading-none mb-4 sm:mb-5">
          <span className="seidrum-glow">Seidrum</span>
        </h1>

        {/* Tagline */}
        <p className="animate-fade-up-delay-2 text-center text-sm sm:text-lg text-white/60 max-w-lg leading-relaxed mb-6 sm:mb-7">
          An event-driven AI kernel that weaves your digital life
          into a living knowledge graph.{" "}
          <span className="text-white/40">
            Rust core. Plugin everything. Always on.
          </span>
        </p>

        {/* CTA row */}
        <div className="animate-fade-up-delay-3 flex items-center gap-4 mb-10 sm:mb-14">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 rounded-lg bg-white/[0.07] border border-white/[0.08] px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12] hover:border-white/[0.15]"
          >
            <svg className="h-4 w-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source
            <svg
              className="h-3.5 w-3.5 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>

          <a
            href={`${GITHUB_URL}#getting-started`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-violet-300/70 transition-colors duration-300 hover:text-violet-300"
          >
            Get started
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Feature cards */}
        <div className="animate-fade-up-delay-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="text-violet-400/60 group-hover:text-violet-400 transition-colors duration-500">
                  {card.icon}
                </div>
                <h3 className="text-[13px] font-semibold text-white/80 tracking-tight">
                  {card.title}
                </h3>
              </div>
              <p className="text-[12px] leading-relaxed text-white/35 group-hover:text-white/45 transition-colors duration-500">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
