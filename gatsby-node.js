const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const select = require('unist-util-select')
const fs = require('fs-extra')
const PAGE_SIZE = 5;

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(
  `
  {
    allMarkdownRemark (
      sort: { fields: [frontmatter___date_created], order: DESC }
    ) {
      edges {
        node {
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
      }
    }
  }
  `
  ).then(result => generateContent(createPage, result))
};

function generateContent(createPage, graphqlResults) {
  if (graphqlResults.errors) {
    console.log(graphqlResults.errors);
    return Promise.reject(graphqlResults.errors);
  }

  const posts = graphqlResults.data.allMarkdownRemark.edges;

  createBlogPages(createPage, posts);
  createPostPages(createPage, posts);
  createTagPages(createPage, posts);
}

function createBlogPages(createPage, posts) {
  const blogTemplate = path.resolve('src/templates/blog.js');

  paginate(createPage, posts, '/blog', blogTemplate, posts);
}

function createPostPages(createPage, posts) {
  const postTemplate = path.resolve('src/templates/post.js');

  const numOfPosts = posts.length;

  for (let i = 0; i < numOfPosts; i++) {
    createPage({
      path: posts[i].node.frontmatter.path,
      component: postTemplate,
      context: {
        post: posts[i],
        nextPost: i > 0 ? posts[i - 1] : null,
        prevPost: i < numOfPosts - 1 ? posts[i + 1] : null,
      },
    });
  }
}

function createTagPages(createPage, posts) {
  const tagTemplate = path.resolve('src/templates/blog.js');

  const numOfPosts = posts.length;
  const tags = {};

  posts.forEach(post => {
    post.node.frontmatter.tags.forEach(tag => {
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(post);
    });
  });

  Object.keys(tags).forEach(tag => {
    paginate(createPage, tags[tag], `/blog/tags/${tag.replace(/ /g, '-')}`, tagTemplate, posts);
  });
}

function paginate(createPage, posts, pathPrefix, template, allPosts) {
  const numOfPosts = posts.length;
  const numOfPages = Math.ceil(posts.length / PAGE_SIZE);

  for (let i = 0; i < numOfPages; i++) {
    createPage({
      path: `${pathPrefix}/${i + 1}`,
      component: template,
      context: {
        page: i + 1,
        pathPrefix,
        numOfPages,
        posts: posts.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
        allPosts,
      },
    });
  }
  createPage({
    path: pathPrefix,
    component: template,
    context: {
      page: 1,
      pathPrefix,
      numOfPages,
      numOfPosts,
      posts: posts.slice(0, PAGE_SIZE),
      allPosts,
    },
  });
}
