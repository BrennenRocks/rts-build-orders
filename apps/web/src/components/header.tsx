import Logo from '@/components/navbar-components/logo';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ThemeSwitcher } from './ui/kibo-ui/theme-switcher';

// Games navigation data
const gamesData = [
  {
    name: 'Stormgate',
    href: '/stormgate',
    description: 'Real-time strategy game by Frost Giant Studios',
  },
  {
    name: 'Age of Empires IV',
    href: '/aoe4',
    description: 'Historical real-time strategy game',
  },
  {
    name: 'WarCraft III',
    href: '/wc3',
    description: 'Classic real-time strategy game',
  },
  {
    name: 'StarCraft 2',
    href: '/sc2',
    description: 'Competitive real-time strategy game',
  },
];

export default function Header() {
  return (
    <header className="container mx-auto px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                aria-label="Open navigation menu"
                className="group size-8 md:hidden"
                size="icon"
                variant="ghost"
              >
                <svg
                  aria-hidden="true"
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-[7px] origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {/* Games dropdown for mobile */}
                  <NavigationMenuItem className="w-full">
                    <div className="px-2 py-1.5 font-medium text-muted-foreground text-xs">
                      Games
                    </div>
                    <ul>
                      {gamesData.map((game) => (
                        <li key={game.name}>
                          <NavigationMenuLink
                            className="flex flex-col gap-1 py-2"
                            href={game.href}
                          >
                            <div className="font-medium">{game.name}</div>
                            <p className="text-muted-foreground text-xs">
                              {game.description}
                            </p>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuItem>

                  {/* Separator */}
                  <div className="-mx-1 my-1 h-px w-full bg-border" />
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a className="text-primary hover:text-primary/90" href="/">
              <Logo />
            </a>

            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden" viewport={false}>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent px-2 py-1.5 font-medium text-muted-foreground hover:text-primary">
                    Games
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50 min-w-64 p-1">
                    <ul className="grid gap-1">
                      {gamesData.map((game) => (
                        <li key={game.name}>
                          <NavigationMenuLink
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href={game.href}
                          >
                            <div className="font-medium text-sm leading-none">
                              {game.name}
                            </div>
                            <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
                              {game.description}
                            </p>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
