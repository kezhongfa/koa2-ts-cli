const shell = require('shelljs');
const colors = require('colors');
const argv = require('minimist')(process.argv.slice(2));
const { version, tag = 'latest' } = argv;

const execAsyncEndTasks = [];

if (version) {
  const execVersionTask = () =>
    execAsync(`npm version ${version} -m "chore: version %s"`, 'execVersionTask');
  const execNpmConfigTask = () => execAsync('npm config get registry', 'execNpmConfigTask');
  const execPublishTask = () => execAsync(`npm publish --tag ${tag}`, 'npmRegistry');
  const execSyncTaoBaoTask = () =>
    execAsync('curl -X PUT https://npm.taobao.org/sync/koa2-ts-cli', 'execSyncTaoBaoTask');
  const execPushTagTask = () => execAsync('git push --follow-tags', 'execPushTagTask');
  execVersionTask()
    .then(execNpmConfigTask)
    .then(execPublishTask)
    .then(execSyncTaoBaoTask)
    .then(execPushTagTask)
    .then(() => {
      console.log('发布成功'.green);
    })
    .finally(() => {
      if (execAsyncEndTasks.length > 0) {
        execAsyncEndTasks.forEach((task) => {
          task();
        });
      }
    })
    .catch((err) => {
      console.log(colors.red(err));
      process.exit(1);
    });
} else {
  console.error(colors.red('未指定version参数'));
}

function execAsync(command, execLog) {
  return new Promise((resolve, reject) => {
    const child = shell.exec(command, { async: true });
    console.log(`${execLog} start`.green);
    child.stdout.on('data', function (data) {
      console.log(`${execLog} stdout ${data}`.yellow);
      if (execLog === 'execNpmConfigTask' && !data.includes('registry.npmjs.org/')) {
        shell.exec('npm config set registry=https://registry.npmjs.org/');
        execAsyncEndTasks.push(() => shell.exec(`npm config set registry=${data}`));
      }
    });
    child.on('close', function (code) {
      if (code === 0) {
        console.log(`${execLog} end`.green);
        resolve();
      } else {
        const error = `${execLog} fail`.red;
        reject(error);
      }
    });
  });
}
