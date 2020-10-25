const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

const getProjectName = require('./steps/get-project-name');
const getTemplateRepo = require('./steps/get-template-repo');
const { waitLoading } = require('./helpers/loading');
const { download } = require('./helpers/github');
const { updatePackage } = require('./helpers/package');

const packageGenerator = (projectName, projectPath) => {
  const incPackage = {
    name: projectName,
    version: '0.0.1',
  };
  updatePackage(path.join(projectPath, 'package.json'), incPackage);
};

module.exports = async (name) => {
  const { projectName, distDir } = await getProjectName(name);
  const { repo, tag } = await getTemplateRepo();
  const { tmpRoot, tmpDir } = await waitLoading(
    download,
    'downloading template',
    `Created a new koa app in ${projectName}.`
  )(repo, tag);
  packageGenerator(projectName, tmpDir);
  fs.copySync(tmpDir, distDir);
  console.log('We suggest that you begin by typing:\n');
  console.log(`cd ${projectName}`);
  console.log('npm install');
  console.log('npm start');
  console.log('\nHappy hacking!');
  shell.rm('-rf', tmpRoot);
};
