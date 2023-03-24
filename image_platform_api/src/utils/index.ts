import md5 = require('md5');

export const hashData = (data: string) => {
  return md5(data);
};
