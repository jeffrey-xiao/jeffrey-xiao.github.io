import PropTypes from "prop-types";
import React from "react";
import favicon from "../static/favicon.ico";

const HTML = (props) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Hi, I'm a student at the Unversity of Waterloo studying software engineering"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="google-site-verification" content="ir-ErX9eSOs0Gl_4GsF5BUqMDF0Wl5jpAlCY_u4bdx0" />
      <meta name="msvalidate.01" content="8D90A2A5E6278F835E03BF86F4352B89" />
      <link rel="shortcut icon" type="image/png" href={favicon} />
      {props.headComponents}
    </head>
    <body>
      <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
      {props.postBodyComponents}
    </body>
  </html>
);

HTML.propTypes = {
  headComponents: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  postBodyComponents: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  body: PropTypes.string.isRequired,
};

export default HTML;
