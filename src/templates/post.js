import PropTypes from "prop-types";
import React from "react";
import ReactDisqusComments from "react-disqus-comments";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import "prismjs/themes/prism-solarizedlight.css";
import "katex/dist/katex.min.css";

import Clear from "../components/clear";
import StyledLink from "../components/styledLink";
import TagLink from "../components/tagLink";
import colors from "../utils/colors";

const PostBody = styled.div`
  div#post-content {
    font-family: "Open Sans", sans-serif;
    pre,
    code {
      font-family: "Inconsolata", monospace;
      line-height: 20px;
    }

    p,
    li {
      line-height: 25px;
      color: ${colors.base2()};
    }

    center {
      margin-top: -15px;
      color: ${colors.base2()};
    }

    h2,
    h3 {
      color: ${colors.base1()};
      text-transform: uppercase;
      margin: 32px 0 8px 0;
    }

    a :not(.anchor) {
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
      font-family: "Open Sans", sans-serif;
      color: ${colors.base2()};
      font-style: italic;
    }
  }

  margin: 0 auto 60px auto;
  position: relative;
  max-width: 675px;
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

const SideContentsDiv = styled.span`
  padding: 25px 0 10px 10px;
  margin: 35px 0 0 10px;
  border-left: 3px solid ${colors.accent1()};
  position: absolute;
  left: 100%;
  top: 0%;
  width: 150px;

  @media only screen and (max-width: 64em) {
    display: none;
  }
`;

const SideContentsLinkWrapper = styled(({ depth, children, ...props }) => (
  <div {...props}>{children}</div>
))`
  margin-left: ${(props) => props.depth * 15}px;
  margin-bottom: 15px;
`;

const SideContents = (props) => {
  const headings = [];
  const headingLinkMap = new Map();
  // prettier-ignore
  const getHeadingLink = (heading) => heading
    .replace(/[^0-9a-zA-Z_ ]/g, "")
    .replace(/ /g, "-")
    .toLowerCase();

  props.headings.forEach((heading) => {
    let headingLink = getHeadingLink(heading.value);
    if (headingLinkMap.has(headingLink)) {
      headingLinkMap.set(headingLink, headingLinkMap.get(headingLink) + 1);
      headingLink = `${headingLink}-${headingLinkMap.get(headingLink)}`;
    } else {
      headingLinkMap.set(headingLink, 0);
    }

    headings.push(
      <SideContentsLinkWrapper key={headingLink} depth={heading.depth - 2}>
        <StyledLink to={`${props.path}#${headingLink}`}>{heading.value}</StyledLink>
      </SideContentsLinkWrapper>,
    );
  });

  return <SideContentsDiv>{headings}</SideContentsDiv>;
};

SideContents.propTypes = {
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
    }),
  ).isRequired,
  path: PropTypes.string.isRequired,
};

class PostTemplate extends React.Component {
  componentDidMount() {
    this.node.style.opacity = 0;
    window.requestAnimationFrame(() => {
      this.node.style.transition = "opacity 1000ms ease-out";
      this.node.style.opacity = 1;
    });
  }

  render() {
    const {
      data: { prevPost, currPost, nextPost },
    } = this.props;
    const tags = [];

    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(currPost.frontmatter.date_created).toLocaleDateString(
      "en-US",
      dateOptions,
    );

    currPost.frontmatter.tags.forEach((tagName) => {
      tags.push(
        <TagLink key={tagName}>
          <Link to={`/blog/tags/${tagName.toLowerCase().replace(/ /g, "-")}`}>{tagName}</Link>
        </TagLink>,
      );
    });

    return (
      <PostBody
        ref={(node) => {
          this.node = node;
        }}
      >
        <Helmet>
          <title>{`${currPost.frontmatter.title} | Jeffrey Xiao`}</title>
        </Helmet>
        <PostTitle>{currPost.frontmatter.title}</PostTitle>
        <PostSubtitle>{formattedDate}</PostSubtitle>
        {tags}
        <div id="post-content" dangerouslySetInnerHTML={{ __html: currPost.html }} />
        <SideContents headings={currPost.headings} path={currPost.frontmatter.path} />
        <ReactDisqusComments
          shortname="jeffreyxiao"
          identifier={currPost.frontmatter.title.toLowerCase().replace(/ /g, "-")}
          title={currPost.frontmatter.title}
          url={`https://jeffreyxiao.me/${currPost.frontmatter.path}`}
        />
        {prevPost && (
          <PrevPostLink>
            <StyledLink to={prevPost.frontmatter.path}>Previous Post</StyledLink>
            <div style={{ marginTop: "5px" }}>{prevPost.frontmatter.title}</div>
          </PrevPostLink>
        )}
        {nextPost && (
          <NextPostLink>
            <StyledLink to={nextPost.frontmatter.path}>Next Post</StyledLink>
            <div style={{ marginTop: "5px" }}>{nextPost.frontmatter.title}</div>
          </NextPostLink>
        )}
        <Clear />
      </PostBody>
    );
  }
}

const postType = PropTypes.shape({
  html: PropTypes.string,
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
    }),
  ).isRequired,
  frontmatter: PropTypes.shape({
    date_created: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
});

PostTemplate.propTypes = {
  pageContext: PropTypes.shape({
    prevPostPath: PropTypes.string,
    currPostPath: PropTypes.string.isRequired,
    nextPostPath: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    prevPost: postType,
    currPost: postType.isRequired,
    nextPost: postType,
  }).isRequired,
};

export default PostTemplate;
export const pageQuery = graphql`
  query($prevPostPath: String, $currPostPath: String!, $nextPostPath: String) {
    prevPost: markdownRemark(frontmatter: { path: { eq: $prevPostPath } }) {
      ...postFields
    }
    currPost: markdownRemark(frontmatter: { path: { eq: $currPostPath } }) {
      ...postFields
    }
    nextPost: markdownRemark(frontmatter: { path: { eq: $nextPostPath } }) {
      ...postFields
    }
  }

  fragment postFields on MarkdownRemark {
    html
    headings {
      value
      depth
    }
    frontmatter {
      date_created
      path
      tags
      title
    }
  }
`;
