import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Lab', path: '/lab' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-200/75 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Studio Brand Mark */}
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

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-6 overflow-x-auto py-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 rounded-md ${
                    isActive
                      ? 'text-zinc-950 font-semibold bg-zinc-100/80 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-primary-600 after:rounded-full'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
