import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from 'grid-styled';
import styled, { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom';

import PostList from '../components/postList';
import RecentList from '../components/recentList';
import Archive from '../components/archive';
import TagList from '../components/tagList';
import Pagination from '../components/pagination';


const getTagName = (pathPrefix) => {
  const tokens = pathPrefix.split('/');
  return tokens[tokens.length - 1].replace(/-/g, ' ');
};

const TagListTitle = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-weight: normal;
  color: #1b2228;
  margin-top: 8px;
`;

class BlogPage extends React.Component {
  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this);
    elem.style.opacity = 0;
    window.requestAnimationFrame(() => {
      elem.style.transition = 'opacity 1000ms ease-out';
      elem.style.opacity = 1;
    });
  }

  render() {
    const context = this.props.pathContext;

    return (
      <ThemeProvider theme={{ breakpoints: [48] }}>
        <div>
          <Helmet>
            <title>Blog - Jeffrey Xiao</title>
          </Helmet>
          <Grid width={1} px={[0, 20]} mt={10} mb={-10}>
            {context.pathPrefix.match(/^\/blog\/tags\//) &&
              <TagListTitle>
                Posts tagged with &lsquo;{getTagName(context.pathPrefix)}&rsquo;
              </TagListTitle>
            }
            <Pagination
              page={context.page}
              pathPrefix={context.pathPrefix}
              numOfPages={context.numOfPages}
            />
          </Grid>
          <Grid width={[1 / 1, 3 / 5]} pt={20} pb={[0, 20]} px={[0, 20]}>
            <PostList posts={context.posts} />
          </Grid>
          <Grid width={[1 / 1, 2 / 5]} pb={20} pt={[0, 20]} px={[0, 20]}>
            <TagList posts={context.allPosts} />
            {context.pathPrefix.match(/^\/blog\/tags\//) &&
              <RecentList posts={context.allPosts.slice(0, Math.min(context.numOfPosts, 5))} />
            }
            <Archive posts={context.allPosts} />
          </Grid>
          <Grid width={1} px={[0, 20]} mt={-50} mb={50}>
            <Pagination
              page={context.page}
              pathPrefix={context.pathPrefix}
              numOfPages={context.numOfPages}
            />
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

export default BlogPage;
