/* eslint-disable */_
import React from 'react';
import favicon from '../static/favicon.ico'

let inlinedStyles;
if (process.env.NODE_ENV === 'production') {
  try {
    inlinedStyles = require('!raw-loader!../public/styles.css');
  } catch (e) {
    console.log(e);
  }
}

const HTML = (props) => {
  let css;
  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        id="gatsby-inlined-css"
        dangerouslySetInnerHTML={{ __html: inlinedStyles }}
      />
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="shortcut icon" type="image/png" href={favicon} />
        {props.headComponents}
        {css}
      </head>
      <body>
        <div
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;