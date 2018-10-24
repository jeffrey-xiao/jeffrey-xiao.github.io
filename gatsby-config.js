module.exports = {
  siteMetadata: {
    title: 'Jeffrey Xiao',
    author: 'Jeffrey Xiao',
    siteUrl: 'http://jeffrey-xiao.github.io/',
  },

  plugins: [
    'gatsby-plugin-layout',
    'gatsby-plugin-sass',
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
    'gatsby-transformer-json',
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
              maxWidth: 650,
              linkImagesToOriginal: false,
              showCaptions: true,
            },
          },
        ],
      },
    },
  ],
};

