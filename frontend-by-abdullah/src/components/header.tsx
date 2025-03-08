import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between px-3 bg-background border-b h-16">
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}
