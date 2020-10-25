const inquirer = require('inquirer');
const { TEMPLATE_REPOLIST } = require('../constants');
const { waitLoading } = require('../helpers/loading');
const { fetchTagList } = require('../helpers/github');

module.exports = async () => {
  const { repo } = await inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choose a template to create project',
    choices: TEMPLATE_REPOLIST,
  });
  let tags = await waitLoading(fetchTagList, 'fetching tags ...', 'fetched tag')(repo);
  tags = tags.map((item) => item.name);
  let tag;
  if (tags.length > 0) {
    const { tag: _tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      message: 'please choise tags to create project',
      choices: tags,
    });
    tag = _tag;
  }
  return { repo, tag };
};
