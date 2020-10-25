const axios = require('axios');
let downloadGitReop = require('download-git-repo');
const { promisify } = require('util');
const { GIT_USER_NAME } = require('../constants');
const { tmp } = require('./fs');

downloadGitReop = promisify(downloadGitReop);

exports.fetchTagList = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/${GIT_USER_NAME}/${repo}/tags`);
  return data;
};

exports.download = async (repo, tag) => {
  let api = `${GIT_USER_NAME}/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  const { name } = tmp();
  const tmpDir = `${name}/${repo}`;

  await downloadGitReop(api, tmpDir);
  return { tmpRoot: name, tmpDir };
};
