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

logger.log('log log log')
logger.info('info info info')
logger.debug('debug debug debug')
logger.notice('notice notice notice')
logger.warn('warn warn warn')
logger.error('error error error')
logger.success('success success success')
```

![image-20210705172731476](https://tva1.sinaimg.cn/large/008i3skNly1gs67afsqymj30ue0cc3z6.jpg)



## msgColor

true: 彩色日志内容，false: 黑色日志内容，默认为true。



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

[xxx] format占位标记， 实际运行会转换为真实的值。如需[]包裹，使用[[xxx]]。

```js
const logger = new Logger({
  level: 3,
  format: '[[label]] - [datetime] - [msg]'
})

logger.log('log log log')
logger.info('info info info')
logger.debug('debug debug debug')
logger.notice('notice notice notice')
logger.warn('warn warn warn')
logger.error('error error error')
logger.success('success success success')
```

![image-20210705172848025](https://tva1.sinaimg.cn/large/008i3skNly1gs67bprwayj30zg05iq3m.jpg)



