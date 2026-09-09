import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-200/75 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:h-20">
          <NavLink
            to="/"
            className="group flex items-center gap-2.5 text-zinc-900 transition-opacity hover:opacity-90"
          >
            <span className="w-2.5 h-2.5 rounded-[2px] bg-primary-600 group-hover:rotate-45 transition-transform duration-300 ease-out" />
            <span className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              STUDIO
            </span>
            <span className="font-bold tracking-tight text-sm sm:text-base text-zinc-900">
              INTERACTION
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}