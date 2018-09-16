#!/usr/bin/env node

const ghpages = require('gh-pages');
const path = require('path');
const fs = require('fs');

fs.writeFileSync(path.join(__dirname, 'public', 'CNAME'), 'jeffreyxiao.me');

ghpages.publish('public', {
  branch: 'master',
  repo: 'https://gitlab.com/jeffrey-xiao/jeffrey-xiao.github.io',
});
