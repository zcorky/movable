const pkg = require('../package.json');

const name = pkg.name.split('/').pop();
const version = pkg.version;
const author = pkg.author;

const banner = 
`/*!
 * ${name} ${version} (https://github.com/${author}/${name})
 * API https://github.com/${author}/${name}/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} ${author}. All Rights Reserved
 * Licensed under MIT (https://github.com/${author}/${name}/blob/master/LICENSE)
 */
`;

exports.name = name;
exports.banner = banner;
