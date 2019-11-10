import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Section from "./section";
import SectionHeader from "./sectionHeader";
import StyledLink from "./styledLink";

const RecentLinksList = styled.ul`
  margin: 0 auto;
  font-family: "Open Sans", sans-serif;
  list-style-type: none;
  text-align: left;

  li:before {
    content: "–";
    position: absolute;
    margin-left: -18px;
  }

  width: 100%;

  @media only screen and (max-width: 64em) {
    width: 80%;
  }
`;

const RecentList = (props) => {
  const recentLinks = [];

  props.posts.forEach((post) => {
    recentLinks.push(
      <li key={post.node.frontmatter.path}>
        <StyledLink to={post.node.frontmatter.path}>{post.node.frontmatter.title}</StyledLink>
      </li>,
    );
  });

  return (
    <Section style={{ textAlign: "center" }}>
      <SectionHeader>Recent Posts</SectionHeader>
      <RecentLinksList>{recentLinks}</RecentLinksList>
    </Section>
  );
};

RecentList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecentList;
