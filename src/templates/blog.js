import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import Archive from '../components/archive';
import Clear from '../components/clear';
import Pagination from '../components/pagination';
import PostList from '../components/postList';
import RecentList from '../components/recentList';
import TagList from '../components/tagList';
import colors from '../utils/colors';

const getTagName = (pathPrefix) => {
  const tokens = pathPrefix.split('/');
  return tokens[tokens.length - 1].replace(/-/g, ' ');
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
      this.node.style.transition = 'opacity 1000ms ease-out';
      this.node.style.opacity = 1;
    });
  }

  render() {
    const context = this.props.pageContext;
    const numOfPosts = context.allPosts.length;

    return (
      <BlogBody
        ref={(node) => {
          this.node = node;
        }}
      >
        <Helmet>
          <title>Blog - Jeffrey Xiao</title>
        </Helmet>
        {context.pathPrefix.match(/^\/blog\/tags\//) && (
          <TagListTitle>{`Posts tagged with “${getTagName(context.pathPrefix)}”`}</TagListTitle>
        )}
        <Pagination
          page={context.page}
          pathPrefix={context.pathPrefix}
          numOfPages={context.numOfPages}
        />
        <BlogLeftColumn>
          <PostList posts={context.posts} tagFilter="" />
        </BlogLeftColumn>
        <BlogRightColumn>
          <TagList posts={context.allPosts} />
          {context.pathPrefix.match(/^\/blog\/tags\//) && (
            <RecentList posts={context.allPosts.slice(0, Math.min(numOfPosts, 5))} />
          )}
          <Archive posts={context.allPosts} activePost="" />
        </BlogRightColumn>
        <Clear />
        <Pagination
          page={context.page}
          pathPrefix={context.pathPrefix}
          numOfPages={context.numOfPages}
        />
      </BlogBody>
    );
  }
}

BlogPage.propTypes = {
  pageContext: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pathPrefix: PropTypes.string.isRequired,
    numOfPages: PropTypes.number.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    allPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default BlogPage;
