// import { writeFileSync } from 'fs';
// import { resolve } from 'path';
// import generateVersion from './version-generator.cjs';

const { resolve } = require('path');
const { writeFileSync } = require('fs');

const version = require('./version-generator.cjs').generateVersion();

const file = resolve(__dirname, '../', 'environments', 'version.ts');
writeFileSync(file, `export const VERSION = '${version}';`);
console.info(`VERSION=${version}`);
