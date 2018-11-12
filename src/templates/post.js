import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import dateFormat from 'dateformat';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import 'prismjs/themes/prism-solarizedlight.css';
import 'katex/dist/katex.min.css';

import Clear from '../components/clear';
import StyledLink from '../components/styledLink';
import TagLink from '../components/tagLink';
import colors from '../utils/colors';


const PostBody = styled.div`
  div#post-content {
    font-family: "Raleway", sans-serif;
    pre, code {
      font-family: 'Inconsolata', monospace;
      line-height: 20px;
    }

    p, li {
      line-height: 25px;
      color: ${colors.base2()};
    }

    h2, h3 {
      color: ${colors.base1()};
      text-transform: uppercase;
      margin: 32px 0 8px 0;
    }

    a {
      color: ${colors.accent1()};
      transition: all 0.5s;
      &:hover {
        background-color: ${colors.accent1(0.1)};
      }
    }

    .gatsby-resp-image-figure {
      margin: 0;
    }

    .gatsby-resp-image-figcaption {
      text-align: center;
      font-family: "Raleway", sans-serif;
      color: ${colors.base2()};
      font-style: italic;
    }
  }

  margin: 0 auto 60px auto;
  position: relative;
  max-width: 650px;
`;

const PostTitle = styled.h1`
  margin-bottom: 5px;
  color: ${colors.base1()};
  text-transform: uppercase;
`;

const PostSubtitle = styled.h4`
  margin-top: 0px;
  margin-bottom: 5px;
  color: ${colors.base3()};
  text-decoration: none;
  font-weight: normal;
  text-transform: uppercase;
`;

const PostLink = styled.div`
  width: 40%;
  text-transform: uppercase;
  font-family: "Josefin Sans", sans-serif;
`;

const PrevPostLink = styled(PostLink)`
  float: left;
  text-align: left !important;
  div {
    text-align: left !important;
  }
`;

const NextPostLink = styled(PostLink)`
  float: right;
  text-align: right !important;
  div {
    text-align: right !important;
  }
`;

const SideContentsDiv = styled.div`
  padding: 25px 0 10px 10px;
  margin: 35px 0 0 25px;
  border-left: 3px solid ${colors.base1()};
  position: absolute;
  left: 100%;
  top: 0%;
  width: 150px;

  @media only screen and (max-width: 64em) {
    display: none;
  };
`;

const SideContentsLink = styled(({ depth, children, ...props }) => (
  <StyledLink {...props}>{children}</StyledLink>
))`
  margin-left: ${props => props.depth * 15}px;
  display: inline-block;
  font-family: "Josefin Sans", sans-serif;
  margin-bottom: 15px;
`;

const SideContents = (props) => {
  const headings = [];
  const headingLinkMap = new Map();
  const getHeadingLink = heading => (
    heading.replace(/[^0-9a-zA-Z_ ]/g, '').replace(/ /g, '-').toLowerCase()
  );

  props.headings.forEach((heading) => {
    let headingLink = getHeadingLink(heading.value);
    if (headingLinkMap.has(headingLink)) {
      headingLinkMap.set(headingLink, headingLinkMap.get(headingLink) + 1);
      headingLink = `${headingLink}-${headingLinkMap.get(headingLink)}`;
    } else {
      headingLinkMap.set(headingLink, 0);
    }

    headings.push(
      <div key={headingLink}>
        <SideContentsLink to={`${props.path}#${headingLink}`} depth={heading.depth - 2}>
          {heading.value}
        </SideContentsLink>
      </div>,
    );
  });

  return (
    <SideContentsDiv>
      {headings}
    </SideContentsDiv>
  );
};

class PostTemplate extends React.Component {
  componentDidMount() {
    this.node.style.opacity = 0;
    window.requestAnimationFrame(() => {
      this.node.style.transition = 'opacity 1000ms ease-out';
      this.node.style.opacity = 1;
    });
  }

  render() {
    const { pageContext: { post: { node: post }, prevPost, nextPost } } = this.props;
    const tags = [];

    const formattedDate = dateFormat(
      new Date(post.frontmatter.date_created),
      'ddd, mmmm dd yyyy',
    );

    post.frontmatter.tags.forEach((tagName) => {
      tags.push(
        <TagLink key={tagName}>
          <Link to={`/blog/tags/${tagName.replace(/ /g, '-')}`}>{tagName}</Link>
        </TagLink>,
      );
    });

    return (
      <PostBody ref={(node) => { this.node = node; }}>
        <Helmet>
          <title>{post.frontmatter.title} | Jeffrey Xiao</title>
        </Helmet>
        <PostTitle>{post.frontmatter.title}</PostTitle>
        <PostSubtitle>{formattedDate}</PostSubtitle>
        {tags}
        <div id="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        <SideContents headings={post.headings} path={post.frontmatter.path} />
        <ReactDisqusComments
          shortname="jeffreyxiao"
          identifier={post.frontmatter.title.toLowerCase().replace(/ /g, '-')}
          title="post.frontmatter.title"
          url={`https://jeffreyxiao.me/blog${post.frontmatter.path}`}
        />
        {
          prevPost
            && (
              <PrevPostLink>
                <StyledLink to={prevPost.node.frontmatter.path}>Previous Post</StyledLink>
                <div style={{ marginTop: '5px' }}>{prevPost.node.frontmatter.title}</div>
              </PrevPostLink>
            )
        }
        {
          nextPost
            && (
              <NextPostLink>
                <StyledLink to={nextPost.node.frontmatter.path}>Next Post</StyledLink>
                <div style={{ marginTop: '5px' }}>{nextPost.node.frontmatter.title}</div>
              </NextPostLink>
            )
        }
        <Clear />
      </PostBody>
    );
  }
}

export default PostTemplate;
