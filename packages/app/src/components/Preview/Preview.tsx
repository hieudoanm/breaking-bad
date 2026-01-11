import {
  periodicTable,
  specificNameColorMap,
} from '@breaking-bad/data/periodic-table';
import { toCapitalize, toKebabCase } from '@breaking-bad/utils/string';
import html2canvas from 'html2canvas-pro';
import { FC, useRef } from 'react';

const periodicTableSymbols: Set<string> = new Set(Object.keys(periodicTable));

/**
 * Find **one and only one** periodic-table symbol anywhere in the word.
 * It does NOT have to be the first substring.
 * Returns the word split into: before + tile + after.
 */
export const highlightElement = (
  word: string
): {
  before: string[];
  tile?: string;
  after: string[];
} => {
  if (!word) return { before: [], after: [] };

  const lower = word.toLowerCase();

  let bestMatch: {
    idx: number;
    symbol: string;
  } | null = null;

  for (const symbol of periodicTableSymbols) {
    const idx = lower.indexOf(symbol.toLowerCase());
    if (idx === -1) continue;

    // 1️⃣ Absolute priority: index 0
    if (idx === 0) {
      if (
        !bestMatch ||
        bestMatch.idx !== 0 ||
        symbol.length > bestMatch.symbol.length
      ) {
        bestMatch = { idx, symbol };
      }
      continue;
    }

    // Ignore non-zero matches if we already have index 0
    if (bestMatch?.idx === 0) continue;

    // 2️⃣ Prefer longer length
    if (
      !bestMatch ||
      symbol.length > bestMatch.symbol.length ||
      // 3️⃣ Same length → left to right
      (symbol.length === bestMatch.symbol.length && idx < bestMatch.idx)
    ) {
      bestMatch = { idx, symbol };
    }
  }

  if (!bestMatch) {
    return {
      before: word.split(''),
      after: [],
    };
  }

  const { idx, symbol } = bestMatch;

  return {
    before: word.slice(0, idx).toLowerCase().split(''),
    tile: toCapitalize(word.slice(idx, idx + symbol.length)),
    after: word
      .slice(idx + symbol.length)
      .toLowerCase()
      .split(''),
  };
};

export type Align = 'left' | 'center' | 'right';

export type PreviewProps = {
  isColored: boolean;
  isMultiline: boolean;
  align: Align;
  text: string;
};

const alignClassMap: Record<Align, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

export const Preview: FC<PreviewProps> = ({
  isColored = false,
  isMultiline = false,
  align = 'center',
  text = '',
}) => {
  const captureRef = useRef<HTMLDivElement>(null);

  const words = text.split(/\s+/);

  const multilineClass = isMultiline
    ? 'flex-col gap-y-2'
    : 'flex-row flex-wrap gap-x-4';

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
      a.download = `${toKebabCase(text)}.png`;
      a.click();
    } catch (err) {
      console.error('Failed to capture image', err);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div
        ref={captureRef}
        className={`flex h-fit w-fit gap-2 p-4 ${multilineClass} ${alignClassMap[align]}`}>
        {words.map((word, wordIdx) => {
          const { before, tile, after } = highlightElement(word);

          const { specificName } = periodicTable[tile ?? ''] ?? {};
          const bgColorClass = isColored
            ? specificNameColorMap[specificName]
            : 'bg-base-content';
          const textColorClass = isColored
            ? 'text-base-content'
            : 'text-base-100';

          return (
            <div
              key={wordIdx}
              className="flex flex-wrap items-center gap-1 text-4xl font-bold">
              {before.map((letter, idx) => (
                <span
                  key={`b-${idx}`}
                  className="text-base-content text-4xl font-semibold">
                  {letter}
                </span>
              ))}

              {tile && (
                <div
                  className={`${bgColorClass} ${textColorClass} relative flex h-16 w-16 flex-col items-center justify-center rounded`}>
                  <span className="absolute top-1 right-1 text-xs">
                    {periodicTable[tile].number ?? 0}
                  </span>
                  <span className="text-4xl">{tile}</span>
                </div>
              )}

              {after.map((letter, idx) => (
                <span
                  key={`a-${idx}`}
                  className="text-base-content text-4xl font-semibold">
                  {letter}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <button className="btn btn-ghost" onClick={handleDownload}>
        💾 Download
      </button>
    </div>
  );
};
