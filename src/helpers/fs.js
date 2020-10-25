const tmp = require('tmp');

tmp.setGracefulCleanup();

exports.tmp = (prefix) => tmp.dirSync({ prefix: prefix || 'kzfTmpDir_' });
