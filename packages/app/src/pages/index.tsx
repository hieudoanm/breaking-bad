import { NextPage } from 'next';
import { useState } from 'react';
import { Align, Preview } from '@breaking-bad/components/Preview';
import { Footer } from '@breaking-bad/components/Footer';
import { Navbar } from '@breaking-bad/components/Navbar';

const HomePage: NextPage = () => {
  const [
    {
      align = 'center',
      isColored = true,
      isMultiline = false,
      name = 'Breaking Bad',
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
    name: 'Breaking Bad',
  });

  return (
    <div className="flex h-screen w-screen flex-col gap-y-4 overflow-hidden p-4 md:gap-y-8 md:p-8">
      {/* Navbar */}
      <div className="flex flex-col gap-y-3">
        {/* Row 1: Title + Periodic Table */}
        <Navbar />

        {/* Row 2: Form */}
        <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-4">
          <input
            id="name"
            name="name"
            placeholder="✨ Your Name"
            className="input transform-all w-full grow"
            value={name}
            onChange={(event) =>
              setState((previous) => ({
                ...previous,
                name: event.target.value,
              }))
            }
          />

          <div className="flex items-center gap-x-4">
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

          {isMultiline && (
            <div className="join">
              <button
                type="button"
                className={`join-item btn btn-soft ${align === 'left' ? 'btn-primary' : ''}`}
                onClick={() =>
                  setState((previous) => ({ ...previous, align: 'left' }))
                }>
                Left
              </button>
              <button
                type="button"
                className={`join-item btn btn-soft ${align === 'center' ? 'btn-primary' : ''}`}
                onClick={() =>
                  setState((previous) => ({ ...previous, align: 'center' }))
                }>
                Center
              </button>
              <button
                type="button"
                className={`join-item btn btn-soft ${align === 'right' ? 'btn-primary' : ''}`}
                onClick={() =>
                  setState((previous) => ({ ...previous, align: 'right' }))
                }>
                Right
              </button>
            </div>
          )}
        </div>
      </div>

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
