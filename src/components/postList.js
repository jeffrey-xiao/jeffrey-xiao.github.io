import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Link from "./link";
import Section from "./section";
import TagLink from "./tagLink";
import UnbrokenStyledLink from "./unbrokenStyledLink";
import colors from "../utils/colors";

const PostTitle = styled.h2`
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${colors.base1()};
  text-transform: uppercase;
`;

const PostSubtitle = styled.h4`
  margin-top: 0px;
  margin-bottom: 5px;
  color: ${colors.base3()};
  font-weight: normal;
  text-transform: uppercase;
`;

const PostTagLinks = styled.div`
  margin-top: 15px;
`;

const PostDescription = styled.div`
  color: ${colors.base2()};
  font-family: "Open Sans", sans-serif;
  margin-bottom: 5px;
`;

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.description = "";
  }

  componentDidMount() {
    let description = "";
    if (document) {
      const doc = document.createElement("html");
      doc.innerHTML = this.props.html;
      const paragraphs = doc.getElementsByTagName("p");

      for (let i = 0; description.length === 0 && i < paragraphs.length; i += 1) {
        const intro = paragraphs[i].textContent.trim();
        const words = intro.split(" ");
        description = words.slice(0, Math.min(words.length, 50)).join(" ");
      }
      this.description = `${description.replace(/[^A-Za-z0-9]$/g, "")}…`;
      this.forceUpdate();
    }
  }

  render() {
    const tagLinks = [];

    this.props.tags.forEach((tag) => {
      tagLinks.push(
        <TagLink key={tag}>
          <Link to={`/blog/tags/${tag.toLowerCase().replace(/ /g, "-")}`}>{tag}</Link>
        </TagLink>,
      );
    });

    const dateOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Date(this.props.date_created).toLocaleDateString(
      "en-US",
      dateOptions,
    );

    return (
      <Section>
        <PostTitle>{this.props.title}</PostTitle>
        <PostSubtitle>{formattedDate}</PostSubtitle>
        <PostDescription>{this.description}</PostDescription>
        <UnbrokenStyledLink to={this.props.link}>Read More</UnbrokenStyledLink>
        <PostTagLinks>{tagLinks}</PostTagLinks>
      </Section>
    );
  }
}

PostCard.propTypes = {
  date_created: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

const PostList = (props) => {
  const posts = [];
  const tag = props.tagFilter;

  props.posts.forEach((post) => {
    const {
      node: {
        frontmatter: { tags },
      },
    } = post;

    if (props.tagFilter === "" || tags.indexOf(tag) !== -1) {
      posts.push(
        <PostCard
          key={post.node.frontmatter.path}
          link={post.node.frontmatter.path}
          title={post.node.frontmatter.title}
          tags={post.node.frontmatter.tags}
          date_created={post.node.frontmatter.date_created}
          html={post.node.html}
        />,
      );
    }
  });

  return <div>{posts}</div>;
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  tagFilter: PropTypes.string.isRequired,
};

export default PostList;
