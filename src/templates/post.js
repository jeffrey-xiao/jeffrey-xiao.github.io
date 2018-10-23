import React from 'react';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';
import ReactDisqusThread from 'react-disqus-thread';
import Link from 'gatsby-link';
import { Grid } from 'grid-styled';
import dateFormat from 'dateformat';
import styled, { ThemeProvider } from 'styled-components';
import 'prismjs/themes/prism-solarizedlight.css';
import 'katex/dist/katex.min.css';

import StyledLink from '../components/styledLink';
import TagLink from '../components/tagLink';
import colors from '../assets/colors';
import Clear from '../components/clear';


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

  margin: 0 auto 35px auto;
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

const PostLink = styled(Grid)`
  text-transform: uppercase;
  font-family: "Josefin Sans", sans-serif;
`;

const PrevPostLink = PostLink.extend`
  float: left;
  text-align: left !important;
  div {
    text-align: left !important;
  }
`;

const NextPostLink = PostLink.extend`
  float: right;
  text-align: right !important;
  div {
    text-align: right !important;
  }
`;

const SideContentsDiv = styled.div`
  padding: 25px 0 10px 10px;
  margin: 35px 0 0 25px;
  border-left: 3px solid ${colors.accent1()};
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
    const elem = ReactDOM.findDOMNode(this);
    elem.style.opacity = 0;
    window.requestAnimationFrame(() => {
      elem.style.transition = 'opacity 1000ms ease-out';
      elem.style.opacity = 1;
    });
  }

  render() {
    const post = this.props.pathContext.post.node;
    const prevPost = this.props.pathContext.prevPost;
    const nextPost = this.props.pathContext.nextPost;

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
      <ThemeProvider theme={{ breakpoints: [48] }}>
        <PostBody>
          <Helmet>
            <title>{post.frontmatter.title} | Jeffrey Xiao</title>
          </Helmet>
          <PostTitle>{post.frontmatter.title}</PostTitle>
          <PostSubtitle>{formattedDate}</PostSubtitle>
          {tags}
          <div id="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          <SideContents headings={post.headings} path={post.frontmatter.path} />
          <ReactDisqusThread
            shortname="jeffreyxiao"
            identifier={post.frontmatter.title.toLowerCase().replace(/ /g, '-')}
            title="post.frontmatter.title"
            url={`https://jeffreyxiao.me/blog${post.frontmatter.path}`}
          />
          {
            prevPost &&
            (
              <PrevPostLink width={4 / 10} style={{ float: 'left' }}>
                <StyledLink to={prevPost.node.frontmatter.path}>Previous Post</StyledLink>
                <div style={{ marginTop: '5px' }}>{prevPost.node.frontmatter.title}</div>
              </PrevPostLink>
            )
          }
          {
            nextPost &&
            (
              <NextPostLink width={4 / 10} style={{ float: 'right' }}>
                <StyledLink to={nextPost.node.frontmatter.path}>Next Post</StyledLink>
                <div style={{ marginTop: '5px' }}>{nextPost.node.frontmatter.title}</div>
              </NextPostLink>
            )
          }
          <Clear />
        </PostBody>
      </ThemeProvider>
    );
  }
}

export default PostTemplate;
