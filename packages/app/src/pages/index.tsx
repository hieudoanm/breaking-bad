import { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { Align, Preview } from '@breaking-bad/components/Preview';
import { Footer } from '@breaking-bad/components/Footer';

const HomePage: NextPage = () => {
  const [
    {
      align = 'center',
      isColored = true,
      isMultiline = false,
      name = 'Better Call Saul',
    },
    setState,
  ] = useState<{
    align: Align;
    isColored: boolean;
    isMultiline: boolean;
    name: string;
  }>({
    align: 'center',
    isColored: true,
    isMultiline: false,
    name: 'Better Call Saul',
  });

  return (
    <div className="flex h-screen w-screen flex-col gap-y-4 overflow-hidden p-4 md:gap-y-8 md:p-8">
      {/* Navbar */}
      <nav className="flex flex-col gap-y-3">
        {/* Row 1: Title + Periodic Table */}
        <div className="flex items-center justify-between">
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
        </div>

        {/* Row 2: Form */}
        <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-4">
          <input
            id="name"
            name="name"
            placeholder="✨ Your Name"
            className="input grow"
            value={name}
            onChange={(event) =>
              setState((previous) => ({
                ...previous,
                name: event.target.value,
              }))
            }
          />

          <div className="flex items-center justify-between gap-x-4">
            <label className="label justify-start gap-2">
              <input
                type="checkbox"
                checked={isColored}
                className="toggle toggle-primary checked:bg-primary/50"
                onChange={(e) =>
                  setState((p) => ({ ...p, isColored: e.target.checked }))
                }
              />
              Colored
            </label>

            <label className="label justify-start gap-2">
              <input
                type="checkbox"
                checked={isMultiline}
                className="toggle toggle-primary checked:bg-primary/50"
                onChange={(e) =>
                  setState((p) => ({ ...p, isMultiline: e.target.checked }))
                }
              />
              Multiline
            </label>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="grow">
        <div className="flex h-full w-full items-center justify-center">
          <Preview
            align={align}
            isColored={isColored}
            isMultiline={isMultiline}
            text={name}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
