/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { readJson } = require('fs-extra');

const ADMIN_ASSET_MANIFEST_PATH = resolve(__dirname, '../assets/build/admin/manifest.json');

module.exports = async function () {
  return {
    admin: await readJson(ADMIN_ASSET_MANIFEST_PATH),
  };
};
