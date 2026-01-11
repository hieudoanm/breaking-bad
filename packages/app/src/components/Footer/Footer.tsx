import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="space-y-1 text-center">
      <p>
        🔬 Create your name in the{' '}
        <span className="text-secondary font-bold">Breaking Bad</span> style.
      </p>
      <p>
        🧪 Built with{' '}
        <span className="text-secondary font-bold">Periodic Table</span>{' '}
        elements.
      </p>
      <p>⚛️ Fun chemistry vibes</p>
    </footer>
  );
};
