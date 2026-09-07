import { Link } from 'react-router-dom';

const featuredProjects = [
  {
    slug: 'gesture-controller',
    title: 'Gesture Controller',
    category: 'Computer Vision / Audio',
    year: '2026',
    description:
      'Touchless multimodal interface leveraging lightweight pose landmark estimation and real-time WebAudio synthesis.',
    tags: ['MediaPipe', 'WebAudio', 'Canvas'],
    accentGrad: 'from-teal-500/15 via-emerald-500/10 to-transparent',
    iconText: 'CV // GESTURE',
  },
  {
    slug: 'spatial-canvas',
    title: 'Spatial Canvas',
    category: 'Spatial UI / WebGL',
    year: '2026',
    description:
      'Infinite-depth canvas workspace designed for intuitive 3D spatial layout manipulation and spatial interaction testing.',
    tags: ['Three.js', 'React', 'Spatial UI'],
    accentGrad: 'from-blue-500/15 via-indigo-500/10 to-transparent',
    iconText: '3D // SPATIAL',
  },
];

export function Home() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="pt-4 pb-8 sm:pt-8 sm:pb-12 space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-zinc-700">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          <span className="tracking-wide">Interaction Design &amp; Creative Technology</span>
        </div>

        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.12]">
            Crafting intuitive, spatial &amp; vision-driven digital interactions.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed font-normal max-w-2xl">
            Bridging human intent and creative computation. Exploring novel interfaces, machine
            learning on the web, and responsive multi-sensory experiences.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
          >
            <span>Explore Selected Work</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            to="/lab"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white border border-zinc-200/90 text-zinc-700 text-sm font-medium hover:bg-zinc-50 hover:text-zinc-950 transition-all duration-200 shadow-sm"
          >
            <span>Interactive Lab</span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold">
              R&amp;D
            </span>
          </Link>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200/80 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <span>View all projects</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="group bg-white rounded-xl border border-zinc-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Card Media / Image Placeholder */}
              <div
                className={`relative aspect-[16/10] w-full bg-gradient-to-br ${project.accentGrad} bg-zinc-100 border-b border-zinc-200/60 p-6 flex flex-col justify-between overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-zinc-700 shadow-sm border border-zinc-200/50">
                    {project.iconText}
                  </span>
                  <span className="text-xs font-mono text-zinc-500 font-medium">
                    {project.year}
                  </span>
                </div>
                <div className="relative z-10 flex items-center justify-center py-6">
                  <div className="w-12 h-12 rounded-lg bg-white/95 backdrop-blur-sm shadow-sm border border-zinc-200/60 flex items-center justify-center text-zinc-700 group-hover:scale-105 transition-transform">
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-white/90 text-zinc-700 border border-zinc-200/60 shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary-700 font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-950 group-hover:text-primary-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">{project.description}</p>
                </div>

                <div className="pt-2 border-t border-zinc-100">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 group-hover:text-primary-700 transition-colors"
                  >
                    <span>Read Case Study</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
