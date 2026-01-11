import {
  periodicTable,
  specificNameColorMap,
} from '@breaking-bad/data/periodic-table';
import { toKebabCase } from '@breaking-bad/utils/string';
import html2canvas from 'html2canvas-pro';
import { FC, useRef } from 'react';

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

  const multilineClass: string = isMultiline
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
        className={`hover:border-base-300 hover:shadow-primary/10 hover:bg-base-100 flex h-fit w-fit gap-2 p-4 transition-transform duration-300 hover:scale-105 hover:rounded-2xl hover:border hover:shadow-2xl ${multilineClass} ${alignClassMap[align]} `}>
        {words.map((word, wordIdx) => {
          const { tile, rest } = highlightFirstElement(word);
          const { specificName } = periodicTable[tile ?? ''] ?? {};
          const bgColorClass: string = isColored
            ? specificNameColorMap[specificName]
            : 'bg-base-content';
          const textColorClass: string = isColored
            ? 'text-base-content'
            : 'text-base-100';

          return (
            <div
              key={wordIdx}
              className="flex flex-wrap items-center gap-1 text-4xl font-bold">
              {tile && (
                <div
                  className={`${bgColorClass} ${textColorClass} relative flex h-16 w-16 flex-col items-center justify-center rounded`}>
                  <span className="absolute top-1 right-1 text-xs">
                    {periodicTable[tile].number}
                  </span>
                  <span className="text-4xl">{tile}</span>
                </div>
              )}
              {rest.map((letter, idx) => (
                <span
                  key={idx}
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
