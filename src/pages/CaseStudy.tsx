import { Link, useParams } from 'react-router-dom';

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();

  const formattedTitle = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Gesture Controller';

  return (
    <article className="max-w-4xl mx-auto space-y-14 sm:space-y-20">
      {/* Header & Metadata */}
      <header className="space-y-6">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Projects</span>
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-1 rounded border border-primary-200/60">
              Case Study
            </span>
            <span className="text-xs font-mono text-zinc-400">slug: {slug}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            {formattedTitle}
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Exploring camera-based multimodal input for browser applications with zero native
            dependencies and sub-frame latency.
          </p>
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 px-6 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase">Role</div>
            <div className="text-sm font-semibold text-zinc-900 mt-1">
              Lead Interaction Engineer
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase">Timeline</div>
            <div className="text-sm font-semibold text-zinc-900 mt-1">4 Weeks (Prototype)</div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase">Core Stack</div>
            <div className="text-sm font-semibold text-zinc-900 mt-1">MediaPipe, WebAudio, TS</div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase">Status</div>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Lab Prototype</span>
            </div>
          </div>
        </div>
      </header>

      {/* Case Study Hero Media Placeholder */}
      <div className="w-full aspect-[21/9] rounded-xl bg-gradient-to-br from-teal-500/10 via-zinc-100 to-zinc-50 border border-zinc-200/80 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="relative text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-white shadow-sm border border-zinc-200/70 mx-auto flex items-center justify-center text-zinc-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
            System Overview &amp; Interaction Diagram Placeholder
          </span>
        </div>
      </div>

      {/* Section 01: Problem */}
      <section className="space-y-6 pt-8 border-t border-zinc-200/80">
        <div className="flex items-center gap-3.5">
          <span className="w-9 h-9 rounded-lg bg-primary-50 border border-primary-200/80 text-primary-800 flex items-center justify-center font-mono font-bold text-sm">
            01
          </span>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              The Problem &amp; Opportunity
            </h2>
          </div>
        </div>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          Traditional web applications remain constrained to touchscreens, mice, and keyboards.
          While webcams are ubiquitous across modern laptops and workstations, spatial interaction
          usually suffers from high frame drops, complex driver installations, and poor
          accessibility feedback.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-lg bg-white border border-zinc-200/80 space-y-2">
            <h3 className="font-semibold text-zinc-900 text-sm">Input Latency Bottleneck</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Standard browser video pipelines introduce latency between physical hand movements and
              visual feedback, breaking immersion.
            </p>
          </div>
          <div className="p-5 rounded-lg bg-white border border-zinc-200/80 space-y-2">
            <h3 className="font-semibold text-zinc-900 text-sm">Lack of Tactile Feedback</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Mid-air gesture interfaces have no physical friction. Without immediate sensory cues,
              users struggle with target acquisition and confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 02: Process */}
      <section className="space-y-6 pt-12 border-t border-zinc-200/80">
        <div className="flex items-center gap-3.5">
          <span className="w-9 h-9 rounded-lg bg-primary-50 border border-primary-200/80 text-primary-800 flex items-center justify-center font-mono font-bold text-sm">
            02
          </span>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              The Iterative Process
            </h2>
          </div>
        </div>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          We designed a multi-stage testing loop focusing on raw model throughput, gesture
          filtering, and dynamic audio synthesis to replace missing haptic sensations.
        </p>

        <div className="space-y-4 pt-2">
          <div className="p-5 rounded-lg bg-white border border-zinc-200/80 flex flex-col sm:flex-row sm:items-start gap-4">
            <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-zinc-100 text-zinc-700 self-start">
              STEP A
            </span>
            <div className="space-y-1">
              <h3 className="font-semibold text-zinc-900 text-sm">Landmark Stream Optimization</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Utilized WebAssembly and offscreen canvas workers to evaluate 21 3D hand landmarks
                at 60 FPS without blocking the UI thread.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-white border border-zinc-200/80 flex flex-col sm:flex-row sm:items-start gap-4">
            <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-zinc-100 text-zinc-700 self-start">
              STEP B
            </span>
            <div className="space-y-1">
              <h3 className="font-semibold text-zinc-900 text-sm">Adaptive Jitter Damping</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Implemented a 1-Euro smoothing filter algorithm to eliminate camera sensor noise
                while maintaining instant responsiveness for fast flick gestures.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-white border border-zinc-200/80 flex flex-col sm:flex-row sm:items-start gap-4">
            <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-zinc-100 text-zinc-700 self-start">
              STEP C
            </span>
            <div className="space-y-1">
              <h3 className="font-semibold text-zinc-900 text-sm">Spatial Audio Sonification</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Mapped pinch velocity and depth coordinates to subtle sine frequency sweeps,
                delivering instant auditory confirmation that mirrors touch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Solution */}
      <section className="space-y-6 pt-12 border-t border-zinc-200/80">
        <div className="flex items-center gap-3.5">
          <span className="w-9 h-9 rounded-lg bg-primary-50 border border-primary-200/80 text-primary-800 flex items-center justify-center font-mono font-bold text-sm">
            03
          </span>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              The Solution &amp; Impact
            </h2>
          </div>
        </div>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          The resulting application demonstrates a fluid, frictionless gesture control paradigm.
          Users can pinch, rotate, and manipulate virtual objects in 3D space with near-zero
          perceptual delay.
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-6 rounded-lg bg-white border border-zinc-200/80 text-center space-y-1 shadow-2xs">
            <div className="text-3xl font-extrabold text-zinc-950 font-mono">&lt; 14ms</div>
            <div className="text-xs font-medium text-zinc-500">Pipeline Latency</div>
          </div>
          <div className="p-6 rounded-lg bg-white border border-zinc-200/80 text-center space-y-1 shadow-2xs">
            <div className="text-3xl font-extrabold text-zinc-950 font-mono">60 FPS</div>
            <div className="text-xs font-medium text-zinc-500">Continuous Tracking</div>
          </div>
          <div className="p-6 rounded-lg bg-white border border-zinc-200/80 text-center space-y-1 shadow-2xs">
            <div className="text-3xl font-extrabold text-zinc-950 font-mono">0 Installs</div>
            <div className="text-xs font-medium text-zinc-500">Pure Browser Runtime</div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="pt-8 flex items-center justify-between">
          <Link
            to="/projects"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; All Projects</span>
          </Link>
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition"
          >
            <span>Test in Interactive Lab</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
