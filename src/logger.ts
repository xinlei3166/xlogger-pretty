import { cyan, magenta, blue, yellow, red, green } from 'kolorist'
import { error } from 'exception-error'
import dayjs from 'dayjs'

const ERROR = 'XLoggerError'

export interface Levels {
  success: 0
  debug: 1
  info: 2
  notice: 3
  warn: 4
  error: 5
}

export type LevelString = keyof Levels
export type LevelNumber = 0 | 1 | 2 | 3 | 4 | 5

export interface IObject {
  [key: string]: any
}

export interface LoggerOptions extends IObject {
  level: LevelString | LevelNumber
  format?: string | null
  datetimeFormat?: string
}

export interface LoggerProps extends IObject {
  label?: string
  msg?: string
  datetime?: string
}

const LEVELS: Levels = {
  success: 0,
  debug: 1,
  info: 2,
  notice: 3,
  warn: 4,
  error: 5
}

export class Logger {
  public level: LevelString | LevelNumber = 0
  public format = '[[label]] [msg]'
  public datetimeFormat = 'YYYY-MM-DD HH:mm:ss'

  constructor(options?: LoggerOptions) {
    const opts = options ?? ({} as LoggerOptions)
    this.level = opts.level || this.level
    this.format = opts.format || this.format
    this.datetimeFormat = opts.datetimeFormat || this.datetimeFormat
    if (!this.validFormat(this.format)) {
      throw error({ code: ERROR, msg: 'invalid format, such as [label] [msg]' })
    }
  }

  validFormat(format: string) {
    const reg = /(\[[a-z]+]).*?/g
    return reg.test(format)
  }

  convertLevel(level?: LevelString | LevelNumber) {
    let levelNumber = 0
    if (typeof level === 'string') {
      levelNumber = LEVELS[level] || 0
    } else if (typeof level === 'number') {
      levelNumber = level
    }
    return levelNumber
  }

  getCurrentDatetime() {
    return dayjs().format(this.datetimeFormat)
  }

  replaces(props: LoggerProps) {
    let format = this.format
    const pattern = /(\[[a-z]+]).*?/g
    const propsKeys = Object.keys(props)
    const formatKeys =
      format
        .match(pattern)
        ?.map(x => x.replace('[', '').replace(']', ''))
        .filter(f => propsKeys.includes(f)) || []
    for (const key of formatKeys) {
      format = format.replace(`[${key}]`, props[key])
    }
    return format
  }

  log(msg?: string, label = 'log', color?: Function, level?: LevelString | LevelNumber) {
    const levelNumber = this.convertLevel(level)
    if (levelNumber < this.level) return
    const props = {
      label,
      msg,
      datetime: this.getCurrentDatetime()
    }
    if (this.format) {
      msg = this.replaces(props)
    }
    if (color) {
      msg = color(msg)
    }
    console.log(msg)
  }

  // level 0
  success(msg?: string, label = 'success') {
    this.log(msg, label, green, 0)
  }

  // level 1
  debug(msg?: string, label = 'debug') {
    this.log(msg, label, magenta, 1)
  }

  // level 2
  info(msg?: string, label = 'info') {
    this.log(msg, label, cyan, 2)
  }

  // level 3
  notice(msg?: string, label = 'notice') {
    this.log(msg, label, blue, 3)
  }

  // level 4
  warn(msg?: string, label = 'warn') {
    this.log(msg, label, yellow, 4)
  }

  // level 5
  error(msg?: string, label = 'error') {
    this.log(msg, label, red, 5)
  }
}

// {
//   level: 0,
//   format: '[[label]] - [datetime] - [msg]'
// }
export const logger = new Logger()

logger.log('log log log')
logger.info('info info info')
logger.debug('debug debug debug')
logger.notice('notice notice notice')
logger.warn('warn warn warn')
logger.error('error error error')
logger.success('success success success')
