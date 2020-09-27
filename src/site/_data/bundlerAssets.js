/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { pathExists, readJson } = require('fs-extra');

const MAIN_ASSET_MANIFEST_PATH = resolve(__dirname, '../assets/build/main-manifest.json');
const ADMIN_ASSET_MANIFEST_PATH = resolve(__dirname, '../assets/build/admin-manifest.json');

async function readJsonIfExists(filePath) {
  const exists = await pathExists(filePath);
  return exists ? await readJson(filePath) : null;
}

module.exports = async function () {
  return {
    main: await readJsonIfExists(MAIN_ASSET_MANIFEST_PATH),
    admin: await readJsonIfExists(ADMIN_ASSET_MANIFEST_PATH),
  };
};
