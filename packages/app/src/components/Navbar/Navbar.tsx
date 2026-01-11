import Link from 'next/link';
import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <nav className="flex items-center justify-between">
      <Link
        href="/"
        className="text-xl font-extrabold tracking-tight md:text-2xl">
        Breaking Bad
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href="/gallery" className="btn btn-ghost">
          🖼️ Gallery
        </Link>
        <Link href="/periodic-table" className="btn btn-ghost">
          🧪 Periodic Table
        </Link>
      </div>
    </nav>
  );
};
