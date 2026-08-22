const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const repoUrl = 'https://github.com/nytroxstudio-creator/nytroxstudio.git';
const token = process.argv[2] || process.env.GITHUB_TOKEN;

if (!token) {
  console.log('\n❌ Missing GitHub Personal Access Token.');
  console.log('Usage: node push_to_github.js <YOUR_GITHUB_TOKEN>\n');
  process.exit(1);
}

async function push() {
  console.log('\n🚀 Pushing all files to ' + repoUrl + ' on branch main...');
  
  const pushResult = await git.push({
    fs,
    http,
    dir: __dirname,
    remote: 'origin',
    ref: 'main',
    force: true,
    onAuth: () => ({ username: token, password: '' })
  });

  console.log('\n✅ SUCCESS! All files pushed to GitHub repository!');
  console.log('👉 https://github.com/nytroxstudio-creator/nytroxstudio\n');
}

push().catch((err) => {
  console.error('\n❌ Push failed:', err.message);
  if (err.data) console.error(err.data);
});