import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border-subtle py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <span>Expression Lab — Stack-Based Expression Visualization</span>
          <span>Built for learning data structures</span>
        </div>
      </footer>
    </div>
  );
}
