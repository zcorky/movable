# Movable
* Make the element be movable anywhere.

## Compatible
- Chrome
- Mobile

## How to
* 1 NPM

```
import Movable from '@zcorky/movable';

new Movable({
  handler: '.handler', // handler selector, default ".handler";
  container: '.container', // container select, default ".container"; if container doesnot exist, it will use handler as container.
  boundable: true, // enable boundary, default false, which means you can move anywhere;
});
```

## 更新日志
[CHANGELOG.md](https://github.com/zcorky/movable/blob/master/CHANGELOG.md)