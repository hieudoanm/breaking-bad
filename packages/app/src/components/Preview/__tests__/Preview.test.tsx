import { render } from '@testing-library/react';
import { Preview } from '../Preview';

describe('Preview', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <Preview isColored={false} isMultiline={false} align={'left'} text={''} />
    );
    expect(container).toMatchSnapshot();
  });
});
