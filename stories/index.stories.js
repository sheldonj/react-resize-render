import React from 'react';
import { storiesOf } from '@storybook/react';
import RenderResize from '../modules/RenderResize';

storiesOf('RenderResize', module)
  .add('basic example', () => (
    <RenderResize
      render={dimensions => {
        return (
          <div style={{}}>
            😀 {dimensions.width} - {dimensions.height}
          </div>
        );
      }}
    />
  ))
  .add('multiple components', () => (
    <div>
      <RenderResize
        render={dimensions => {
          return (
            <div style={{}}>
              😀 {dimensions.width} - {dimensions.height}
            </div>
          );
        }}
      />
      <RenderResize
        render={dimensions => {
          return (
            <div style={{}}>
              😎 {dimensions.width} - {dimensions.height}
            </div>
          );
        }}
      />
    </div>
  ));
