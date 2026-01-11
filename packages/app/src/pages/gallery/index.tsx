import { Footer } from '@breaking-bad/components/Footer';
import { Navbar } from '@breaking-bad/components/Navbar';
import { Preview } from '@breaking-bad/components/Preview';
import { NextPage } from 'next';
import { useState } from 'react';

const initialItems = [
  { isColored: false, isMultiline: false, text: 'Breaking Bad' },
  { isColored: false, isMultiline: false, text: 'Walter White' },
  { isColored: false, isMultiline: false, text: 'Jesse Pinkman' },
  { isColored: false, isMultiline: false, text: 'Skyler White' },
  { isColored: false, isMultiline: false, text: 'Hank Schrader' },
  { isColored: false, isMultiline: false, text: 'Marie Schrader' },
  { isColored: false, isMultiline: false, text: 'Saul Goodman' },
  { isColored: false, isMultiline: false, text: 'Gus Fring' },
];

export const GalleryPage: NextPage = () => {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="flex min-h-screen flex-col gap-y-4 overflow-auto p-4 md:gap-y-8 md:p-8">
      <Navbar />
      <main className="grow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          {items.map(
            ({ isColored = false, isMultiline = false, text = '' }, index) => {
              return (
                <div
                  key={text}
                  className="col-span-1 flex flex-col items-center justify-center gap-y-2">
                  <div className="flex items-center gap-x-2">
                    <label className="label justify-start gap-2">
                      <input
                        id={`is-colored-${index}`}
                        type="checkbox"
                        checked={isColored}
                        className="toggle toggle-xs toggle-primary checked:bg-primary/50"
                        onChange={(event) => {
                          const checked: boolean = event.target.checked;

                          setItems((previous) =>
                            previous.map((item, i) =>
                              i === index
                                ? { ...item, isColored: checked }
                                : item
                            )
                          );
                        }}
                      />
                      <span className="text-xs">Colored</span>
                    </label>
                    <label className="label justify-start gap-2">
                      <input
                        id={`is-multiline-${index}`}
                        type="checkbox"
                        checked={isMultiline}
                        className="toggle toggle-xs toggle-primary checked:bg-primary/50"
                        onChange={(event) => {
                          const checked: boolean = event.target.checked;

                          setItems((previous) =>
                            previous.map((item, i) =>
                              i === index
                                ? { ...item, isMultiline: checked }
                                : item
                            )
                          );
                        }}
                      />
                      <span className="text-xs">Multiline</span>
                    </label>
                  </div>
                  <Preview
                    align="center"
                    isColored={isColored}
                    isMultiline={isMultiline}
                    text={text}
                  />
                </div>
              );
            }
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GalleryPage;
