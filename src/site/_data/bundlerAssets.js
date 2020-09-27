/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { readJson } = require('fs-extra');

const MAIN_ASSET_MANIFEST_PATH = resolve(__dirname, '../assets/build/main-manifest.json');
const ADMIN_ASSET_MANIFEST_PATH = resolve(__dirname, '../assets/build/admin-manifest.json');

module.exports = async function () {
  return {
    main: await readJson(MAIN_ASSET_MANIFEST_PATH),
    admin: await readJson(ADMIN_ASSET_MANIFEST_PATH),
  };
};
