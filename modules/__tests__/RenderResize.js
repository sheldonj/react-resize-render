import React from 'react';
import { render } from 'react-testing-library';
import RenderResize from '../RenderResize';

test('make sure the RenderResize component outputs the correct width and height', () => {
  const { container } = render(
    <RenderResize
      render={dimensions => {
        return (
          <div>
            {dimensions.width} - {dimensions.height}
          </div>
        );
      }}
    />
  );
  expect(container.innerHTML).toMatch(`${global.innerWidth} - ${global.innerHeight}`);
});

test('check to see if the component outputs the correct value after a window resize event', () => {
  const { container } = render(
    <RenderResize
      render={dimensions => {
        return (
          <div>
            {dimensions.width} - {dimensions.height}
          </div>
        );
      }}
    />
  );
  global.window.innerWidth = 500;
  global.window.innerHeight = 500;
  global.window.dispatchEvent(new Event('resize'));
  // need this because of the debounce event handler.
  setTimeout(() => {
    expect(container.innerHTML).toMatch('<div>500 - 500</div>');
  }, 20);
});
