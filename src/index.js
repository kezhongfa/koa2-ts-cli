const program = require('commander');
const path = require('path');
const { VERSION } = require('./constants');

const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: ['koa2ts create <project-name>'],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .name('koa2ts')
    .usage('[global options] command')
    .command(action)
    .alias(mapActions[action].alias)
    .description(mapActions[action].description)
    .action(() => {
      if (action === '*') {
        console.log(mapActions[action].description);
      } else {
        const args = [...process.argv.slice(3)];
        require(path.resolve(__dirname, action))(...args);
      }
    });
});

program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(`  ${example}`);
    });
  });
});

program.version(VERSION).parse(process.argv);
