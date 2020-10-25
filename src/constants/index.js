const { version: VERSION } = require('../../package.json');

// 项目模板列表
const TEMPLATE_REPOLIST = ['koa-ts-base-template'];

// git 用户名
const GIT_USER_NAME = 'kezhongfa';

const GITHUB_API_HOST = 'https://api.github.com';

module.exports = {
  VERSION,
  TEMPLATE_REPOLIST,
  GIT_USER_NAME,
  GITHUB_API_HOST,
};
