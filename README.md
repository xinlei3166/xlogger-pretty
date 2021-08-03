# xlogger-pretty

A logger as pretty and easy to use as the Python logging library.



## Install

```bash
npm install xlogger-pretty
yarn add xlogger-pretty
```



## Quick Start

```js
import Logger from 'xlogger-pretty'

const logger = new Logger()

logger.log('This is a normal log.')
logger.info('This is an info log.')
logger.debug('This is a debug log.')
logger.notice('This is a notice log.')
logger.warn('This is a warn log.')
logger.error('This is an error log.')
logger.success('This is a success log.')
```

![image-20210803160255373](https://tva1.sinaimg.cn/large/008i3skNly1gt3ntaxgg9j31bg0d0dh5.jpg)



## Options

| name           | type          | default             | desc                                                         |
| -------------- | ------------- | ------------------- | ------------------------------------------------------------ |
| level          | number/string | 0                   | 日志输出级别，可以数字或者字符串，详情见下面Level说明        |
| format         | string        | [label] [msg]       | 自定义日志输出格式                                           |
| datetimeFormat | string        | YYYY-MM-DD HH:mm:ss | 日志时间格式                                                 |
| msgColor       | boolean       | false               | 日志内容是否为彩色                                           |
| wrapLabel      | boolean       | false               | 日志标签是否被[]包裹                                         |
| uppercaseLabel | boolean       | false               | 日志标签是否大写                                             |
| colors         | object        | null                | 自定义日志标签输出颜色, { success: green }，颜色值取kolorist库中的颜色函数 (import { green } from 'kolorist') |



## Custom Colors

```js
import * as colors from 'kolorist'

const logger = new Logger({
  uppercaseLabel: true,
  colors: {
    info: colors.bgBlue,
    debug: colors.bgMagenta,
    notice: colors.bgCyan,
    warn: colors.bgYellow,
    error: colors.bgRed,
    success: colors.bgGreen
  }
})

logger.info('This is an info log.')
logger.debug('This is a debug log.')
logger.notice('This is a notice log.')
logger.warn('This is a warn log.')
logger.error('This is an error log.')
logger.success('This is a success log.')
```

![image-20210803203120367](https://tva1.sinaimg.cn/large/008i3skNly1gt3vklf571j31fg0aqaba.jpg)



## Custom Display Format

**Level**
log方法不受级别控制

| LevelString | LevelNumber |
| ----------- | ----------- |
| success     | 0           |
| debug       | 1           |
| info        | 2           |
| notice      | 3           |
| warn        | 4           |
| error       | 5           |



**Exposed variable**

| name     | default                              | desc     |
| -------- | ------------------------------------ | -------- |
| label    | info/debug/notice/warn/error/success | 日志标签 |
| msg      | msg                                  | 日志内容 |
| datetime | 2021-07-05 17:21:01                  | 当前时间 |



**Example**

[xxx] format占位标记， 实际运行会转换为真实的值。

```js
const logger = new Logger({
  format: '[datetime] - [label] - [msg]',
  wrapLabel: true,
  uppercaseLabel: true,
  msgColor: true
})

logger.log('This is a normal log.')
logger.info('This is an info log.')
logger.debug('This is a debug log.')
logger.notice('This is a notice log.')
logger.warn('This is a warn log.')
logger.error('This is an error log.')
logger.success('This is a success log.')
```

![image-20210803163726963](https://tva1.sinaimg.cn/large/008i3skNly1gt3ot87h9ij31hy0cgjuy.jpg)

