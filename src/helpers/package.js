const fs = require('fs-extra');
const os = require('os');
const objectMerge = require('object-merge');

/**
 * 更新package.json
 * @param packagePath package 路径
 * @param inPkg 增量 package 数据
 */
exports.updatePackage = (packagePath, incPkg) => {
  try {
    if (fs.existsSync(packagePath)) {
      const current = fs.readFileSync(packagePath, { encoding: 'UTF-8' });
      const currentJson = objectMerge(JSON.parse(current), incPkg);
      fs.writeFileSync(packagePath, `${JSON.stringify(currentJson, null, 2)}${os.EOL}`, {
        encoding: 'UTF-8',
      });
    } else {
      throw new Error(`${packagePath} 不存在`);
    }
  } catch (error) {
    throw error;
  }
};
