import { NextPage } from 'next';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas-pro';
import {
  periodicTable,
  specificNameColorMap,
} from '@breaking-bad/data/periodic-table';
import Link from 'next/link';

const periodicTableSymbols: Set<string> = new Set(Object.keys(periodicTable));

export function highlightFirstElement(word: string): {
  tile?: string;
  rest: string[];
} {
  if (!word) return { rest: [] };

  let tile: string | undefined;
  let rest: string[] = [];

  const firstTwo = word.slice(0, 2);
  const normalizedTwo =
    firstTwo[0]?.toUpperCase() + (firstTwo[1]?.toLowerCase() ?? '');
  const normalizedOne = word[0].toUpperCase();

  if (periodicTableSymbols.has(normalizedTwo)) {
    tile = normalizedTwo;
    rest = word.slice(2).split('');
  } else if (periodicTableSymbols.has(normalizedOne)) {
    tile = normalizedOne;
    rest = word.slice(1).split('');
  } else {
    rest = word.split('');
  }

  return { tile, rest };
}

const toKebabCase = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces and non-alphanum with -
    .replace(/^-+|-+$/g, ''); // remove leading/trailing -

const HomePage: NextPage = () => {
  const [name, setName] = useState('Breaking Bad');
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!captureRef.current) return;

    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: null,
        scrollY: -window.scrollY,
      });

      const dataUrl = canvas.toDataURL('image/png');

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${toKebabCase(name)}.png`;
      a.click();
    } catch (err) {
      console.error('Failed to capture image', err);
    }
  };

  const words = name.split(/\s+/);

  return (
    <div className="flex h-screen w-screen flex-col gap-y-4 overflow-hidden p-4 md:gap-y-8 md:p-8">
      <nav>
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <input
            id="name"
            name="name"
            placeholder="Name"
            className="input grow"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button className="btn btn-primary" onClick={handleDownload}>
            Download
          </button>
          <Link href="/periodic-table" className="btn btn-ghost">
            Periodic Table
          </Link>
        </div>
      </nav>

      <main className="grow">
        {/* We wrap the content we want to capture in a ref */}
        <div
          ref={captureRef}
          className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
          {words.map((word, wordIdx) => {
            const { tile, rest } = highlightFirstElement(word);
            const { specificName } = periodicTable[tile ?? ''] ?? {};
            const colorClass = specificNameColorMap[specificName];

            return (
              <div
                key={wordIdx}
                className="flex flex-wrap items-center justify-center gap-1 text-4xl font-bold">
                {tile && (
                  <div
                    className={`${colorClass} relative flex h-16 w-16 flex-col items-center justify-center rounded border-2 text-white`}>
                    <span className="absolute top-1 right-1 text-xs">
                      {periodicTable[tile].number}
                    </span>
                    <span className="text-4xl">{tile}</span>
                  </div>
                )}
                {rest.map((letter, idx) => (
                  <span key={idx} className="text-4xl font-semibold text-white">
                    {letter}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
