[![NPM version](https://img.shields.io/npm/v/@zcorky/movable.svg?style=flat)](https://www.npmjs.com/package/@zcorky/movable)
[![Coverage Status](https://img.shields.io/coveralls/zcorky/movable.svg?style=flat)](https://coveralls.io/r/zcorky/movable)
[![Dependencies](https://david-dm.org/@zcorky/movable/status.svg)](https://david-dm.org/@zcorky/movable)
[![Build Status](https://travis-ci.com/zcorky/movable.svg?branch=master)](https://travis-ci.com/zcorky/movable)
![license](https://img.shields.io/github/license/zcorky/movable.svg)
[![issues](https://img.shields.io/github/issues/zcorky/movable.svg)](https://github.com/zcorky/movable/issues)

# Movable
* Make the element be movable anywhere.

## Compatible
- PC & Mobile

## How to
* 1 NPM
* 2 Script

```
// 1 NPM
import Movable from '@zcorky/movable';

new Movable({
  handler: '.handler', // handler selector, default ".handler";
  container: '.container', // container select, default ".container"; if container doesnot exist, it will use handler as container.
  boundable: true, // enable boundary, default false, which means you can move anywhere;
});

// 2 Script
<script src="https://unpkg.com/@zcorky/movable/lib/index.umd.js"></script>
<script>
  new movable({
    handler: '.handler',
    container: '.container',
    boundable: true,
  })
</script>
```

## Change Log
[CHANGELOG.md](https://github.com/zcorky/movable/blob/master/CHANGELOG.md)