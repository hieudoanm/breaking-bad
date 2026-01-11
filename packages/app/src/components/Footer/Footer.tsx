import Link from 'next/link';
import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="space-y-1 text-center">
      <p>
        ⚛️ Create your name in the{' '}
        <Link
          href="/"
          className="text-secondary font-bold underline decoration-dotted">
          Breaking Bad
        </Link>{' '}
        style.
      </p>
      <p>
        🧪 Built with{' '}
        <Link
          href="/periodic-table"
          className="text-secondary font-bold underline decoration-dotted">
          Periodic Table
        </Link>{' '}
        elements.
      </p>
      <p>
        🖼️ Check out our{' '}
        <Link
          href="/gallery"
          className="text-secondary font-bold underline decoration-dotted">
          Gallery
        </Link>
      </p>
    </footer>
  );
};
