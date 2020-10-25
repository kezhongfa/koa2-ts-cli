const ora = require('ora');

exports.waitLoading = (fn, beginMessage, endMessage) => async (...args) => {
  const spinner = ora(beginMessage);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed(endMessage || beginMessage);
  return result;
};
