const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const { exit } = require('process');
const { isString } = require('../helpers/type');

const getProjectName = async () =>
  await inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: '请输入项目名称:',
        filter: (val) => val.trim(),
        validate: (val) => (val.length === 0 ? '项目名称不正确' : true),
      },
    ])
    .then((answer) => answer.name);

module.exports = async (name) => {
  let projectName = name;
  if (!isString(projectName) || projectName.trim().length === 0) {
    projectName = await getProjectName();
  }
  const distDir = path.resolve(projectName);
  fs.ensureDirSync(distDir);
  const list = fs.readdirSync(distDir);
  if (list.length) {
    console.log(`The directory ${projectName} contains files that could conflict:\n`);
    for (let index = 0; index < list.length; index++) {
      console.log(`${list[index]}`);
    }
    console.log('\nEither try using a new directory name, or remove the files listed above.');
    exit(1);
  }

  return { projectName, distDir };
};
