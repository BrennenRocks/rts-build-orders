import { Link } from '@tanstack/react-router';

import { ModeToggle } from './mode-toggle';
import UserMenu from './user-menu';

export default function Header() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className="absolute top-0 right-0 left-0 z-50 backdrop-blur-sm">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link
                className="text-white transition-colors hover:text-white/80"
                key={to}
                to={to}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
