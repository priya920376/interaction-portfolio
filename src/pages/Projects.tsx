import { Link } from 'react-router-dom';

interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  accentGrad: string;
  iconText: string;
}

const projects: Project[] = [
  {
    slug: 'gesture-controller',
    title: 'Gesture Controller',
    category: 'Computer Vision / Audio',
    year: '2026',
    summary:
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
    summary:
      'Infinite-depth canvas workspace designed for intuitive 3D spatial layout manipulation and spatial interaction testing.',
    tags: ['Three.js', 'React', 'Spatial UI'],
    accentGrad: 'from-blue-500/15 via-indigo-500/10 to-transparent',
    iconText: '3D // SPATIAL',
  },
  {
    slug: 'haptic-audio-synth',
    title: 'Haptic Audio Synth',
    category: 'Multimodal Interaction',
    year: '2025',
    summary:
      'Browser experiment synchronizing physical vibration feedback with expressive Web Audio tone oscillators.',
    tags: ['WebAudio', 'Navigator API', 'TypeScript'],
    accentGrad: 'from-amber-500/15 via-orange-500/10 to-transparent',
    iconText: 'AUDIO // HAPTICS',
  },
  {
    slug: 'adaptive-screen-interface',
    title: 'Adaptive Screen Interface',
    category: 'Accessible Design System',
    year: '2025',
    summary:
      'High-contrast accessible widget design system optimized for motor-impaired and keyboard-first navigation flows.',
    tags: ['a11y', 'Tailwind CSS', 'Design Systems'],
    accentGrad: 'from-purple-500/15 via-pink-500/10 to-transparent',
    iconText: 'A11Y // SYSTEM',
  },
];

export function Projects() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-600" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Archive // Work
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Projects &amp; Experiments
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 mt-2 max-w-2xl leading-relaxed">
              A curated selection of interaction design case studies, computer vision prototypes,
              and multimodal web experiments.
            </p>
          </div>
          <span className="inline-flex items-center self-start md:self-auto px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 text-zinc-600 border border-zinc-200/70">
            Showing {projects.length} Works
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group bg-white rounded-xl border border-zinc-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Card Media Placeholder */}
            <div
              className={`relative aspect-[16/10] w-full bg-gradient-to-br ${project.accentGrad} bg-zinc-100 border-b border-zinc-200/60 p-6 flex flex-col justify-between overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-zinc-700 shadow-sm border border-zinc-200/50">
                  {project.iconText}
                </span>
                <span className="text-xs font-mono text-zinc-500 font-medium">{project.year}</span>
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
                    className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-white/90 text-zinc-700 border border-zinc-200/60 shadow-2xs"
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
                <h2 className="text-xl font-bold text-zinc-950 group-hover:text-primary-700 transition-colors">
                  {project.title}
                </h2>
                <p className="text-zinc-600 text-sm leading-relaxed">{project.summary}</p>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 group-hover:text-primary-700 transition-colors"
                >
                  <span>View Case Study</span>
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
    </div>
  );
}
