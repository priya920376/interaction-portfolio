import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white mt-auto py-10 sm:py-14 text-zinc-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-[2px] bg-primary-600" />
              <span className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                STUDIO // INTERACTION
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Spatial interaction design, browser-based computer vision research, and creative
              frontend engineering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-600">
            <Link to="/" className="hover:text-zinc-950 transition-colors">
              Home
            </Link>
            <Link to="/projects" className="hover:text-zinc-950 transition-colors">
              Projects
            </Link>
            <Link to="/lab" className="hover:text-zinc-950 transition-colors">
              Lab
            </Link>
            <Link to="/about" className="hover:text-zinc-950 transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-zinc-950 transition-colors">
              Contact
            </Link>
            <span className="text-zinc-300">|</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-950 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-950 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
          <p>&copy; {new Date().getFullYear()} Interaction Studio. All rights reserved.</p>
          <p>Designed with Vite + React + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
