import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'grid-styled';

import Section from './section';
import SectionHeader from './sectionHeader';
import StyledLink from './styledLink';


const RecentList = (props) => {
  const recentLinks = [];

  props.posts.forEach((post) => {
    recentLinks.push(
      <div key={post.node.frontmatter.path}>
        <StyledLink to={post.node.frontmatter.path}>
          {post.node.frontmatter.title}
        </StyledLink>
      </div>,
    );
  });

  return (
    <Section style={{ textAlign: 'center' }}>
      <SectionHeader>Recent Posts</SectionHeader>
      <Grid width={[1, 4 / 5]}>
        {recentLinks}
      </Grid>
    </Section>
  );
};

RecentList.propTypes = {
  posts: PropTypes.array,
};

RecentList.defaultProps = {
  posts: [],
};

export default RecentList;
