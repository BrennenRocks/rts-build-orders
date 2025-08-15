import { ThemeSwitcher } from './ui/kibo-ui/theme-switcher';

export default function Header() {
  return (
    <div className="absolute top-0 right-0 left-0 z-50">
      <div className="flex flex-row items-center justify-end px-4 py-2">
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
