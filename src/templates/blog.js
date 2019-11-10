import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Archive from "../components/archive";
import Clear from "../components/clear";
import Pagination from "../components/pagination";
import PostList from "../components/postList";
import RecentList from "../components/recentList";
import TagList from "../components/tagList";
import colors from "../utils/colors";

const getTagName = (pathPrefix) => {
  const tokens = pathPrefix.split("/");
  return tokens[tokens.length - 1].replace(/-/g, " ");
};

const BlogBody = styled.div`
  margin-bottom: 60px;
`;

const BlogLeftColumn = styled.div`
  display: inline-block;
  width: 60%;
  float: left;
  padding: 20px 20px 0 0;
  box-sizing: border-box;
  margin-bottom: -25px;

  @media only screen and (max-width: 52em) {
    width: 100%;
    padding: 20px 0 0 0;
    margin-bottom: 0;
  }
`;

const BlogRightColumn = styled.div`
  display: inline-block;
  width: 40%;
  float: right;
  padding: 20px 0 0 20px;
  box-sizing: border-box;
  margin-bottom: -25px;

  @media only screen and (max-width: 52em) {
    width: 100%;
    padding: 0 0 0 0;
  }
`;

const TagListTitle = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-weight: normal;
  color: ${colors.base1()};
  margin-top: 8px;
`;

class BlogPage extends React.Component {
  componentDidMount() {
    this.node.style.opacity = 0;
    window.requestAnimationFrame(() => {
      this.node.style.transition = "opacity 1000ms ease-out";
      this.node.style.opacity = 1;
    });
  }

  render() {
    const {
      pageContext,
      data: {
        pagePosts: { edges: pagePosts },
        allPosts: { edges: posts },
      },
    } = this.props;
    const tagCount = new Map();
    posts.forEach((post) => {
      post.node.frontmatter.tags.forEach((tag) => {
        if (!tagCount.has(tag)) {
          tagCount.set(tag, 0);
        }
        tagCount.set(tag, tagCount.get(tag) + 1);
      });
    });

    return (
      <BlogBody
        ref={(node) => {
          this.node = node;
        }}
      >
        <Helmet>
          <title>Blog - Jeffrey Xiao</title>
        </Helmet>
        {pageContext.pathPrefix.match(/^\/blog\/tags\//) && (
          <TagListTitle>{`Posts tagged with “${getTagName(pageContext.pathPrefix)}”`}</TagListTitle>
        )}
        <Pagination
          page={pageContext.page}
          numOfPages={pageContext.numOfPages}
          pathPrefix={pageContext.pathPrefix}
        />
        <BlogLeftColumn>
          <PostList posts={pagePosts} tagFilter="" />
        </BlogLeftColumn>
        <BlogRightColumn>
          <TagList tagCount={tagCount} />
          {pageContext.pathPrefix.match(/^\/blog\/tags\//) && (
            <RecentList posts={posts.slice(0, Math.min(5, posts.length))} />
          )}
          <Archive posts={posts} />
        </BlogRightColumn>
        <Clear />
        <Pagination
          page={pageContext.page}
          pathPrefix={pageContext.pathPrefix}
          numOfPages={pageContext.numOfPages}
        />
      </BlogBody>
    );
  }
}

BlogPage.propTypes = {
  pageContext: PropTypes.shape({
    page: PropTypes.number.isRequired,
    numOfPages: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    pathPrefix: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    pagePosts: PropTypes.object.isRequired,
    allPosts: PropTypes.object.isRequired,
  }).isRequired,
};

export default BlogPage;
export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $tags: [String]!) {
    pagePosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date_created], order: DESC }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { tags: { in: $tags } } }
    ) {
      edges {
        node {
          ...postFields
        }
      }
    }
    allPosts: allMarkdownRemark(sort: { fields: [frontmatter___date_created], order: DESC }) {
      edges {
        node {
          frontmatter {
            tags
            path
            title
            date_created
          }
        }
      }
    }
  }
`;
