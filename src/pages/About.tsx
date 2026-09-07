import { Link } from 'react-router-dom';

const focusAreas = [
  {
    title: 'Spatial Computing & XR',
    description:
      'Developing natural gesture interactions, 3D canvases, and depth-aware web experiences.',
  },
  {
    title: 'Client-side Machine Learning',
    description:
      'Integrating MediaPipe, TensorFlow.js, and WebAssembly models directly in browser runtimes.',
  },
  {
    title: 'Multimodal Interfaces',
    description:
      'Bridging audio sonification, tactile haptics, and responsive visual feedback loops.',
  },
  {
    title: 'Accessible Design Systems',
    description:
      'Ensuring cutting-edge interactions remain keyboard-first, navigable, and a11y compliant.',
  },
];

const experienceTimeline = [
  {
    role: 'Senior Interaction Engineer',
    org: 'Creative Tech Lab',
    period: '2024 &ndash; Present',
    desc: 'Leading research on vision-driven browser interfaces and experimental user testing frameworks.',
  },
  {
    role: 'Design Technologist',
    org: 'Studio Interface',
    period: '2022 &ndash; 2024',
    desc: 'Prototyped WebGL spatial tools, design systems, and real-time interactive installations.',
  },
  {
    role: 'Frontend Engineer',
    org: 'Interactive Studio',
    period: '2020 &ndash; 2022',
    desc: 'Built high-performance React web applications and component design libraries.',
  },
];

export function About() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200/80 pb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
          Profile // Background
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">About</h1>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Profile Card & Quick Info */}
        <aside className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-zinc-200/80 p-6 space-y-5 shadow-2xs">
            {/* Portrait / Avatar Placeholder */}
            <div className="aspect-square rounded-lg bg-gradient-to-br from-teal-500/10 via-zinc-100 to-zinc-200 border border-zinc-200/60 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="relative z-10 flex justify-end">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/90 text-zinc-600 font-medium">
                  PORTRAIT
                </span>
              </div>
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-zinc-200/80 flex items-center justify-center text-zinc-500">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <span className="text-xs font-mono text-zinc-400">Interaction Designer</span>
              </div>
            </div>

            {/* Quick Meta */}
            <div className="space-y-3 text-sm pt-1">
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500 text-xs font-mono uppercase">Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500 text-xs font-mono uppercase">Location</span>
                <span className="text-zinc-800 font-medium text-xs">
                  San Francisco &bull; Remote
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-zinc-500 text-xs font-mono uppercase">Discipline</span>
                <span className="text-zinc-800 font-medium text-xs">Creative Engineering</span>
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition shadow-2xs"
            >
              <span>Get in touch</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </aside>

        {/* Right Column: Bio, Focus Areas, Experience */}
        <div className="md:col-span-8 space-y-12">
          {/* Bio Statement */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
              Bridging design precision with computational interaction.
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
              I am an interaction designer and software engineer passionate about how humans
              manipulate digital space. My work focuses on replacing rigid point-and-click
              abstractions with natural spatial gestures, sensory audio, and accessible feedback
              loops.
            </p>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              With a background bridging design systems and creative coding, I partner with
              forward-thinking teams to prototype zero-to-one interaction concepts and translate
              complex research into refined, production-ready web products.
            </p>
          </section>

          {/* Focus Areas Grid */}
          <section className="space-y-4 pt-6 border-t border-zinc-200/80">
            <h3 className="text-lg font-bold text-zinc-950 tracking-tight">Core Focus Areas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="p-5 rounded-lg bg-white border border-zinc-200/80 space-y-2 hover:border-zinc-300 transition-colors shadow-2xs"
                >
                  <h4 className="font-semibold text-zinc-900 text-sm">{area.title}</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="space-y-4 pt-6 border-t border-zinc-200/80">
            <h3 className="text-lg font-bold text-zinc-950 tracking-tight">Selected Experience</h3>
            <div className="space-y-4">
              {experienceTimeline.map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-lg bg-white border border-zinc-200/80 flex flex-col sm:flex-row sm:items-start justify-between gap-2 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-950 text-sm">{item.role}</span>
                      <span className="text-zinc-400">&bull;</span>
                      <span className="text-xs text-primary-800 font-medium">{item.org}</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <span
                    className="text-xs font-mono text-zinc-400 shrink-0 self-start sm:self-auto"
                    dangerouslySetInnerHTML={{ __html: item.period }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
