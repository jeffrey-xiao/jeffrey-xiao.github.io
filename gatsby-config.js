module.exports = {
  siteMetadata: {
    title: 'Jeffrey Xiao',
    author: 'Jeffrey Xiao',
    siteUrl: 'https://jeffreyxiao.me/',
  },

  plugins: [
    'gatsby-plugin-layout',
    'gatsby-plugin-nprogress',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
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
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-katex',
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

