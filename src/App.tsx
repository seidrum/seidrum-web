import { useEffect, useRef } from "react";
import GraphCanvas from "./GraphCanvas";

const GITHUB_URL = "https://github.com/seidrum/seidrum";

/* ===================================================================
   Scroll-reveal observer
   =================================================================== */

function useReveal() {
  const observed = useRef(new Set<Element>());

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => {
      io.observe(el);
      observed.current.add(el);
    });

    return () => io.disconnect();
  }, []);
}

/* ===================================================================
   Data
   =================================================================== */

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Knowledge Graph",
    desc: "Entities, facts, and relationships stored in ArangoDB with temporal confidence decay. Your digital life as a living, queryable web — not a flat chat log.",
    detail: "Every piece of information has a confidence score that decays over time. Stale facts fade; reinforced facts strengthen. The graph knows what it knows — and what it's forgetting.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "Autonomous Agents",
    desc: "Persistent consciousness streams that observe, reason, and act on your behalf — continuously, not just when prompted.",
    detail: "Agents subscribe to event streams, build context from the knowledge graph, and decide when to act. They can delegate to specialist agents, schedule wake-ups, and learn from outcomes.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: "Plugin Everything",
    desc: "Every capability is a plugin — an independent process that connects via NATS, declares its events, and self-wires into the system.",
    detail: "Plugins can be written in any language. They register on startup, publish and subscribe to typed events, and the kernel handles routing, health checks, and lifecycle management.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Event-Driven Core",
    desc: "Built on NATS JetStream for reliable, ordered event delivery. Every action in the system is an event — observable, replayable, composable.",
    detail: "No polling, no cron jobs, no tightly coupled services. Events flow through the system and any plugin can react. Add new capabilities without touching existing code.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Scope-Isolated Memory",
    desc: "Every query is scope-enforced. Conversations, entities, and facts are partitioned — agents only see what they're authorized to access.",
    detail: "Scopes let you separate personal, work, and project contexts. An agent handling your work email never sees your personal journal entries. Privacy is structural, not policy.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Multi-LLM Routing",
    desc: "Route requests to the right model based on task complexity, cost, and latency. OpenAI, Anthropic, Ollama, or your own endpoint.",
    detail: "The LLM router scores each request and selects the optimal provider. Fallback chains, token budgets, and provider health monitoring are built in.",
  },
];

const USE_CASES = [
  {
    emoji: "🧠",
    title: "Personal Knowledge Base",
    desc: "Feed it your notes, bookmarks, conversations, and documents. Seidrum connects the dots — surfacing relationships you'd never find by searching.",
  },
  {
    emoji: "💬",
    title: "Multi-Channel Assistant",
    desc: "Telegram, CLI, API, or your own frontend. Same agent, same memory, same context — every channel is just another plugin.",
  },
  {
    emoji: "🔧",
    title: "Developer Copilot",
    desc: "Code review agent, proactive monitor, research assistant. Agents that understand your codebase and watch your CI pipeline.",
  },
  {
    emoji: "📊",
    title: "Business Intelligence",
    desc: "Ingest reports, extract entities and facts, track confidence over time. Ask questions in natural language, get answers grounded in your data.",
  },
];

const FLOW_STEPS = [
  { label: "Channel", sub: "Telegram, CLI, API", color: "text-blue-400" },
  { label: "Ingest", sub: "Store in brain", color: "text-emerald-400" },
  { label: "Extract", sub: "Entities, facts, tasks", color: "text-amber-400" },
  { label: "Agents", sub: "Reason + act", color: "text-violet-400" },
  { label: "Respond", sub: "Route to channel", color: "text-rose-400" },
];

const TECH = [
  { name: "Rust", role: "Kernel + plugins" },
  { name: "NATS JetStream", role: "Event backbone" },
  { name: "ArangoDB", role: "Knowledge graph" },
  { name: "Axum", role: "Management API" },
  { name: "Tokio", role: "Async runtime" },
  { name: "React", role: "Dashboard" },
];

/* ===================================================================
   Component
   =================================================================== */

function App() {
  useReveal();

  return (
    <div className="relative min-h-screen w-full bg-[#06020f] selection:bg-violet-500/30 overflow-x-hidden">
      {/* ============================================================
          HERO — full viewport with animated canvas
          ============================================================ */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        <GraphCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#06020f_75%)]" />

        <div className="relative z-10 flex flex-col items-center px-6 max-w-4xl">
          <img
            src="/seidrum-icon.svg"
            alt=""
            className="animate-fade-up mb-6 h-20 w-20 sm:h-24 sm:w-24 drop-shadow-[0_0_24px_rgba(129,140,248,0.3)]"
          />

          <div className="animate-fade-up mb-4 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/25">
              /say-drum/
            </span>
            <span className="hidden sm:inline-block h-px w-8 bg-white/10 animate-draw-in" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-violet-400/50">
              Old Norse: seeing hidden connections
            </span>
          </div>

          <h1 className="animate-fade-up-delay-1 text-center text-[clamp(2.8rem,10vw,7rem)] font-black tracking-[-0.03em] leading-none mb-4 sm:mb-5">
            <span className="seidrum-glow">Seidrum</span>
          </h1>

          <p className="animate-fade-up-delay-2 text-center text-sm sm:text-lg text-white/60 max-w-xl leading-relaxed mb-6 sm:mb-7">
            An event-driven AI kernel that weaves your digital life
            into a living knowledge graph.{" "}
            <span className="text-white/40">
              Rust core. Plugin everything. Always on.
            </span>
          </p>

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
              <svg className="h-3.5 w-3.5 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>

            <a
              href="#features"
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-violet-300/70 transition-colors duration-300 hover:text-violet-300"
            >
              Explore
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up-delay-4">
          <div className="h-8 w-5 rounded-full border border-white/15 flex items-start justify-center p-1.5">
            <div className="h-1.5 w-1 rounded-full bg-white/30 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURES — 6-card grid
          ============================================================ */}
      <section id="features" className="relative py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-4">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-violet-400/60">
              Capabilities
            </span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl font-bold text-white/90 tracking-tight mb-4">
            Built for the age of agents
          </h2>
          <p className="reveal text-base sm:text-lg text-white/40 max-w-2xl mb-14 leading-relaxed">
            Seidrum isn't another chatbot wrapper. It's a runtime — a persistent,
            event-driven substrate where AI agents live, remember, and collaborate.
          </p>

          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="reveal group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-violet-400/60 group-hover:text-violet-400 transition-colors duration-500">
                    {f.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-white/85 tracking-tight">
                    {f.title}
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-white/45 group-hover:text-white/55 transition-colors duration-500 mb-3">
                  {f.desc}
                </p>
                <p className="text-[12px] leading-relaxed text-white/25 group-hover:text-white/35 transition-colors duration-500">
                  {f.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          EVENT FLOW — visual pipeline
          ============================================================ */}
      <section className="relative py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-4">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-violet-400/60">
              Architecture
            </span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl font-bold text-white/90 tracking-tight mb-4">
            Events in, intelligence out
          </h2>
          <p className="reveal text-base sm:text-lg text-white/40 max-w-2xl mb-14 leading-relaxed">
            Every message flows through a typed event pipeline.
            Plugins subscribe to the events they care about and produce new ones.
            The kernel orchestrates — plugins specialize.
          </p>

          {/* Flow diagram */}
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 mb-16">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 sm:px-7 py-4 min-w-[120px]">
                  <span className={`text-sm font-semibold ${step.color}`}>
                    {step.label}
                  </span>
                  <span className="text-[11px] text-white/30 mt-1">
                    {step.sub}
                  </span>
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <svg className="flow-arrow h-4 w-6 text-white/20 mx-1 hidden sm:block" fill="none" viewBox="0 0 24 16" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 8h16m0 0l-5-5m5 5l-5 5" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Code example */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white/80 mb-3">Write a plugin in minutes</h3>
              <p className="text-[13px] text-white/40 leading-relaxed mb-5">
                Every plugin follows the same pattern: connect to NATS, register,
                subscribe to events, process, and publish. The kernel handles
                discovery, health monitoring, and lifecycle.
              </p>
              <p className="text-[13px] text-white/40 leading-relaxed">
                Plugins are independent processes. They can be written in Rust,
                Python, Go, TypeScript — anything that speaks NATS. Deploy one,
                deploy a hundred. Scale what matters.
              </p>
            </div>

            <div className="code-block p-5">
              <pre>
                <code>{`\
`}<span className="cmt">// Connect to the event backbone</span>{`
`}<span className="kw">let</span>{` nats = `}<span className="fn">NatsClient::connect</span>{`().`}<span className="fn">await</span>{`?;

`}<span className="cmt">// Register with the kernel</span>{`
nats.`}<span className="fn">publish</span>{`(`}<span className="str">"plugin.register"</span>{`, PluginRegister {
    id:       `}<span className="str">"my-plugin"</span>{`,
    consumes: `}<span className="kw">vec!</span>{`[`}<span className="str">"content.stored"</span>{`],
    produces: `}<span className="kw">vec!</span>{`[`}<span className="str">"content.enriched"</span>{`],
}).`}<span className="fn">await</span>{`?;

`}<span className="cmt">// React to events</span>{`
`}<span className="kw">while let</span>{` Some(msg) = sub.`}<span className="fn">next</span>{`().`}<span className="fn">await</span>{` {
    `}<span className="kw">let</span>{` enriched = `}<span className="fn">process</span>{`(&msg);
    nats.`}<span className="fn">publish</span>{`(`}<span className="str">"content.enriched"</span>{`, enriched).`}<span className="fn">await</span>{`?;
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          USE CASES
          ============================================================ */}
      <section className="relative py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-4">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-violet-400/60">
              Use Cases
            </span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl font-bold text-white/90 tracking-tight mb-4">
            What you can build
          </h2>
          <p className="reveal text-base sm:text-lg text-white/40 max-w-2xl mb-14 leading-relaxed">
            Seidrum is a foundation, not a finished product. The plugin architecture
            means the same kernel powers radically different use cases.
          </p>

          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {USE_CASES.map((uc) => (
              <div
                key={uc.title}
                className="reveal group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{uc.emoji}</span>
                  <h3 className="text-[15px] font-semibold text-white/85 tracking-tight">
                    {uc.title}
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-white/40 group-hover:text-white/50 transition-colors duration-500">
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TECH STACK + ARCHITECTURE
          ============================================================ */}
      <section className="relative py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-4">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-violet-400/60">
              Under the Hood
            </span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl font-bold text-white/90 tracking-tight mb-4">
            Serious infrastructure
          </h2>
          <p className="reveal text-base sm:text-lg text-white/40 max-w-2xl mb-14 leading-relaxed">
            Seidrum is designed for reliability, performance, and extensibility.
            The Rust kernel runs as a single binary that manages concurrent services
            via Tokio — no garbage collection pauses, no runtime overhead.
          </p>

          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Architecture diagram (text-based) */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-white/70 mb-6 tracking-tight">System Architecture</h3>
              <div className="space-y-4 font-mono text-[12px]">
                <div className="rounded-lg bg-violet-500/10 border border-violet-500/20 p-3 text-center">
                  <span className="text-violet-300">Channels</span>
                  <span className="text-white/30 block text-[10px] mt-0.5">Telegram · CLI · API Gateway · WebSocket</span>
                </div>
                <div className="text-center text-white/15">↓ events ↓</div>
                <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
                  <div className="text-center text-blue-300 mb-2">NATS JetStream</div>
                  <div className="text-[10px] text-white/25 text-center">Typed events · Guaranteed delivery · Subject-based routing</div>
                </div>
                <div className="text-center text-white/15">↓ ↑</div>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                  <div className="text-center text-emerald-300 mb-2">Seidrum Kernel</div>
                  <div className="grid grid-cols-3 gap-1 text-[9px] text-white/30 text-center">
                    <span className="rounded bg-white/5 py-1">Brain</span>
                    <span className="rounded bg-white/5 py-1">Orchestrator</span>
                    <span className="rounded bg-white/5 py-1">Consciousness</span>
                    <span className="rounded bg-white/5 py-1">Registry</span>
                    <span className="rounded bg-white/5 py-1">LLM Router</span>
                    <span className="rounded bg-white/5 py-1">Scheduler</span>
                  </div>
                </div>
                <div className="text-center text-white/15">↓</div>
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-center">
                  <span className="text-amber-300">ArangoDB</span>
                  <span className="text-white/30 block text-[10px] mt-0.5">Knowledge graph · Entities · Facts · Scopes · Conversations</span>
                </div>
              </div>
            </div>

            {/* Tech badges */}
            <div>
              <h3 className="text-sm font-semibold text-white/70 mb-6 tracking-tight">Tech Stack</h3>
              <div className="space-y-3">
                {TECH.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-5 py-3"
                  >
                    <span className="text-[14px] font-medium text-white/70">{t.name}</span>
                    <span className="text-[12px] text-white/30">{t.role}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h4 className="text-[13px] font-semibold text-white/60 mb-3">Why Rust?</h4>
                <p className="text-[12px] text-white/35 leading-relaxed">
                  A personal AI agent runs 24/7. Memory safety without a GC means
                  no surprise pauses. Zero-cost abstractions mean the event loop stays
                  fast under load. And the type system catches entire categories of
                  bugs at compile time — critical for a system that manages your
                  personal data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          GETTING STARTED
          ============================================================ */}
      <section className="relative py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="reveal mb-4">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-violet-400/60">
              Get Started
            </span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl font-bold text-white/90 tracking-tight mb-4">
            Three commands to your own AI kernel
          </h2>
          <p className="reveal text-base sm:text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
            The setup wizard handles infrastructure — NATS, ArangoDB, and initial
            configuration. You'll be running in under a minute.
          </p>

          <div className="reveal code-block p-5 sm:p-6 text-left mb-12 mx-auto max-w-lg">
            <pre>
              <code>{`\
`}<span className="cmt"># Clone and build</span>{`
`}<span className="fn">git clone</span>{` https://github.com/seidrum/seidrum
`}<span className="fn">cd</span>{` seidrum && `}<span className="fn">cargo build</span>{` --workspace

`}<span className="cmt"># Interactive setup (downloads NATS, starts ArangoDB)</span>{`
`}<span className="fn">seidrum setup</span>{`

`}<span className="cmt"># Launch kernel + enabled plugins</span>{`
`}<span className="fn">seidrum start</span>{`

`}<span className="cmt"># Open the dashboard</span>{`
`}<span className="fn">open</span>{` http://localhost:3030`}</code>
            </pre>
          </div>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-violet-500/15 border border-violet-500/25 px-7 py-3 text-sm font-medium text-violet-200 transition-all duration-300 hover:bg-violet-500/25 hover:border-violet-500/35"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
              <svg className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>

            <a
              href={`${GITHUB_URL}/tree/main/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white/70"
            >
              Read the docs
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="border-t border-white/[0.04] py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/seidrum-icon.svg" alt="" className="h-5 w-5 opacity-40" />
            <span className="text-[12px] text-white/25">
              Seidrum — open source under MIT
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/25 hover:text-white/50 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`${GITHUB_URL}/tree/main/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/25 hover:text-white/50 transition-colors"
            >
              Documentation
            </a>
            <a
              href={`${GITHUB_URL}/tree/main/docs/PLUGIN_SPEC.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/25 hover:text-white/50 transition-colors"
            >
              Plugin Spec
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
