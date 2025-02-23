
import { MainNav } from "./main-nav";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 border-r p-6">
        <MainNav />
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
