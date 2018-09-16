module.exports = {
  siteMetadata: {
    title: 'Jeffrey Xiao',
    author: 'Jeffrey Xiao',
    siteUrl: 'http://jeffrey-xiao.github.io/',
  },

  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-json',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-nprogress',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'blog-posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
        name: 'projects',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-katex',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
};

