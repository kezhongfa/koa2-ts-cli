function isTypeMatched(data, type) {
  return Object.prototype.toString.call(data) === type;
}

exports.isString = (data) => {
  return isTypeMatched(data, '[object String]');
};

exports.isArray = (data) => {
  return isTypeMatched(data, '[object Array]');
};

exports.isObject = (data) => {
  return isTypeMatched(data, '[object Object]');
};

exports.isNumber = (data) => {
  return isTypeMatched(data, '[object Number]');
};

exports.isBoolean = (data) => {
  return isTypeMatched(data, '[object Boolean]');
};
