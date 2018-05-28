import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import RenderResize from '../modules/RenderResize';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
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
