import { Footer } from '@breaking-bad/components/Footer';
import { Navbar } from '@breaking-bad/components/Navbar';
import {
  periodicTable,
  specificNameColorMap,
  Element,
} from '@breaking-bad/data/periodic-table';
import { NextPage } from 'next';
import { FC, useState } from 'react';

const elements = Object.entries(periodicTable);

const Block: FC<{
  selectedType: string | null;
  symbol: string;
  element: Element;
  style: Record<string, string>;
}> = ({ selectedType = null, symbol = '', element, style = {} }) => {
  const isGray = selectedType !== null && selectedType !== element.specificName;

  const backgroundColor = isGray
    ? 'bg-gray-100/10'
    : specificNameColorMap[element.specificName];

  return (
    <div
      className={`flex min-h-[70px] min-w-[60px] flex-col items-center justify-center rounded p-2 text-white shadow-lg transition-opacity ${backgroundColor} ${
        isGray ? 'opacity-20' : 'opacity-100'
      }`}
      style={style}>
      <span className="text-xs">{element.number}</span>
      <span className="my-1 text-xl font-bold">{symbol}</span>
      <span
        title={element.name}
        className="w-full truncate text-center text-[10px]">
        {element.name}
      </span>
      <span className="mt-0.5 text-[10px]">{element.mass}</span>
    </div>
  );
};

const PeriodicTable: FC<{ selectedType: string | null }> = ({
  selectedType = null,
}) => {
  return (
    <div className="grid grid-cols-18 gap-1">
      {elements.map(([symbol, element]) => {
        const isFBlock = element.group === 0;

        const gridColumn = isFBlock
          ? element.number - (element.specificName === 'Actinide' ? 88 : 56) + 2
          : element.group;

        const gridRow = isFBlock
          ? element.specificName === 'Actinide'
            ? 9
            : 8
          : element.period;

        const colSpan = 1;

        return (
          <Block
            key={symbol}
            selectedType={selectedType}
            symbol={symbol}
            element={element}
            style={{
              gridColumn: `${gridColumn} / span ${colSpan}`,
              gridRow: gridRow.toString(),
            }}
          />
        );
      })}
    </div>
  );
};

const PeriodicTablePage: NextPage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const specificNames = Array.from(
    new Set(elements.map(([, el]) => el.specificName))
  );

  return (
    <div className="flex min-h-screen flex-col gap-y-4 overflow-auto p-4 md:gap-y-8 md:p-8">
      <Navbar />

      {/* Filter buttons */}
      <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-5">
        {specificNames.map((name) => {
          const backgroundColor =
            selectedType === null || selectedType === name
              ? specificNameColorMap[name]
              : 'bg-gray-100/10';
          return (
            <button
              key={name}
              className={`btn w-full font-semibold text-white shadow-md transition hover:cursor-pointer ${backgroundColor} ${
                selectedType === name ? 'ring-2 ring-white' : ''
              }`}
              onClick={() =>
                setSelectedType(selectedType === name ? null : name)
              }>
              {name}
            </button>
          );
        })}
      </div>

      {/* Periodic table grid */}
      <div className="hidden md:block">
        <PeriodicTable selectedType={selectedType} />
      </div>
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {elements.map(([symbol, element]) => {
          return (
            <Block
              key={symbol}
              selectedType={selectedType}
              symbol={symbol}
              element={element}
              style={{}}
            />
          );
        })}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PeriodicTablePage;
