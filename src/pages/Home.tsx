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
    iconText: '3D // SPATIAL',
  },
];

export function Home() {
  return (
    <div className="space-y-16 sm:space-y-24" style={{ backgroundColor: '#FDF8F0' }}>
      {/* Hero Section */}
      <section className="pt-4 pb-8 sm:pt-8 sm:pb-12 space-y-6 sm:space-y-8 px-4 sm:px-0">
        <div
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-sm"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#F4A896', color: '#3A3226' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#F4A896' }} />
          <span className="tracking-wide">Interaction Design &amp; Creative Technology</span>
        </div>

        <div className="space-y-4 max-w-3xl">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12]"
            style={{ color: '#3A3226' }}
          >
            Hii!! I'm Priya 👋
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl leading-relaxed font-normal max-w-2xl"
            style={{ color: '#6B5F4F' }}
          >
            I'm building playful, gesture-driven interfaces — things you can point at, pinch,
            and shoot webs from. Scroll down and give it a try.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
            style={{ backgroundColor: '#F4A896' }}
          >
            <span>Explore Selected Work</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/lab"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-all duration-200 shadow-sm"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#A8C3B0', color: '#3A3226' }}
          >
            <span>Interactive Lab</span>
            <span
              className="text-[11px] font-mono px-1.5 py-0.5 rounded font-semibold"
              style={{ backgroundColor: '#EAF2EC', color: '#4B6B54' }}
            >
              R&amp;D
            </span>
          </Link>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="space-y-8 px-4 sm:px-0 pb-16">
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4"
          style={{ borderColor: '#EFE6D8' }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-wider font-medium" style={{ color: '#A8967D' }}>
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1" style={{ color: '#3A3226' }}>
              Featured Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: '#6B5F4F' }}
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
              className="group rounded-xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#EFE6D8' }}
            >
              <div
                className="relative aspect-[16/10] w-full border-b p-6 flex flex-col justify-between overflow-hidden"
                style={{ backgroundColor: '#FBF3E7', borderColor: '#EFE6D8' }}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="font-mono text-xs font-semibold px-2 py-1 rounded shadow-sm border"
                    style={{ backgroundColor: '#FFFFFF', color: '#6B5F4F', borderColor: '#EFE6D8' }}
                  >
                    {project.iconText}
                  </span>
                  <span className="text-xs font-mono font-medium" style={{ color: '#A8967D' }}>
                    {project.year}
                  </span>
                </div>
                <div className="relative z-10 flex items-center justify-center py-6">
                  <div
                    className="w-12 h-12 rounded-lg shadow-sm border flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#EFE6D8', color: '#F4A896' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                      className="px-2 py-0.5 text-[11px] font-medium rounded-full border shadow-2xs"
                      style={{ backgroundColor: '#EAF2EC', color: '#4B6B54', borderColor: '#D6E5DA' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: '#D18B6F' }}>
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold transition-colors" style={{ color: '#3A3226' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B5F4F' }}>
                    {project.description}
                  </p>
                </div>

                <div className="pt-2 border-t" style={{ borderColor: '#EFE6D8' }}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: '#3A3226' }}
                  >
                    <span>Read Case Study</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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