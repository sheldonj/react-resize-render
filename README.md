# react-resize-render

[![Build Status](https://travis-ci.org/sheldonj/react-resize-render.svg?branch=master)](https://travis-ci.org/sheldonj/react-resize-render) [![npm version](https://badge.fury.io/js/react-resize-render.svg)](https://badge.fury.io/js/react-resize-render)

A render prop solution for tracking window resize events in a browser. Uses a single event handler for all instances of the render prop componenent to attempt to maximize perforance by limiting multiple resize events.

## Getting Started

```js
  npm install react-resize-render -S 
```

```js
// using ES6 modules
  import RenderResize from 'react-resize-render';

  <RenderResize
    render={({width, height}) => {
      return (
        <div>
          {width}px - {height}px
        </div>
      );
    }}
  />
```

[Checkout the storybook site for more examples.](https://sheldonj.github.io/react-resize-render/docs/?selectedKind=Welcome&selectedStory=to%20Storybook&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)