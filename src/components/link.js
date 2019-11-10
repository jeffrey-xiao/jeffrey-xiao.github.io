import PropTypes from "prop-types";
import React from "react";
import { Link as GatsbyLink } from "gatsby";

// prettier-ignore
const Link = ({ to, children, ...props }) => (
  /(^https?:\/\/)|(mailto)/.test(to)
    ? <a href={to} {...props}>{children}</a>
    : <GatsbyLink to={to} {...props}>{children}</GatsbyLink>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
