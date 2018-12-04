const path = require('path');

const PAGE_SIZE = 5;

function paginate(createPage, posts, pathPrefix, template, allPosts) {
  const numOfPosts = posts.length;
  const numOfPages = Math.ceil(posts.length / PAGE_SIZE);

  for (let i = 0; i < numOfPages; i += 1) {
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

function createBlogPages(createPage, posts) {
  const blogTemplate = path.resolve('src/templates/blog.js');

  paginate(createPage, posts, '/blog', blogTemplate, posts);
}

function createPostPages(createPage, posts) {
  const postTemplate = path.resolve('src/templates/post.js');
  const numOfPosts = posts.length;

  for (let i = 0; i < numOfPosts; i += 1) {
    createPage({
      path: posts[i].node.frontmatter.path,
      component: postTemplate,
      context: {
        prevPostPath: i < numOfPosts - 1 ? posts[i + 1].node.frontmatter.path : '',
        currPostPath: posts[i].node.frontmatter.path,
        nextPostPath: i > 0 ? posts[i - 1].node.frontmatter.path : '',
      },
    });
  }
}

function createTagPages(createPage, posts) {
  const tagTemplate = path.resolve('src/templates/blog.js');
  const tags = {};

  posts.forEach((post) => {
    post.node.frontmatter.tags.forEach((tag) => {
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(post);
    });
  });

  Object.keys(tags).forEach((tag) => {
    paginate(
      createPage,
      tags[tag],
      `/blog/tags/${tag.toLowerCase().replace(/ /g, '-')}`,
      tagTemplate,
      posts,
    );
  });
}

function generateContent(createPage, graphqlResults) {
  if (graphqlResults.errors) {
    Promise.reject(graphqlResults.errors);
    return;
  }

  const posts = graphqlResults.data.allMarkdownRemark.edges;

  createBlogPages(createPage, posts);
  createPostPages(createPage, posts);
  createTagPages(createPage, posts);
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date_created], order: DESC }) {
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
  `).then((result) => generateContent(createPage, result));
};
