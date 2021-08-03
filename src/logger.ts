import { green, magenta, cyan, blue, yellow, red, bgLightGreen, bgLightRed } from 'kolorist'
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
  level?: LevelString | LevelNumber
  format?: string | null
  datetimeFormat?: string
  msgColor?: boolean
  wrapLabel?: boolean
  uppercaseLabel?: boolean
  colors?: { [key: string]: Function }
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
  public format = '[label] [msg]'
  public datetimeFormat = 'YYYY-MM-DD HH:mm:ss'
  public msgColor = false
  public wrapLabel = false
  public uppercaseLabel = false
  public colors = {
    success: green,
    debug: magenta,
    info: cyan,
    notice: blue,
    warn: yellow,
    error: red
  }

  constructor(options?: LoggerOptions) {
    const opts = options ?? ({} as LoggerOptions)
    this.level = opts.level || this.level
    this.format = opts.format || this.format
    this.datetimeFormat = opts.datetimeFormat || this.datetimeFormat
    this.msgColor = !!opts.msgColor
    this.wrapLabel = !!opts.wrapLabel
    this.uppercaseLabel = !!opts.uppercaseLabel
    this.colors = { ...this.colors, ...(options?.colors || {}) }
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
    let newlineCharacter = ''
    if (msg?.startsWith('\n')) {
      newlineCharacter = (msg.match(/^\n+/) || [])[0]
      msg = msg?.replace(/^\n+/, '')
    }
    label = this.formatLabel(label)
    const props = {
      label: (color && color(label)) || label,
      msg,
      datetime: this.getCurrentDatetime()
    }
    if (this.format) {
      msg = this.replaces(props)
    }
    if (newlineCharacter) {
      msg = newlineCharacter + msg
    }
    if (color && this.msgColor) {
      msg = color(msg)
    }
    this.text(msg)
  }

  text(msg?: string, color?: Function) {
    msg = color ? color(msg) : msg
    console.log(msg)
  }

  enter() {
    console.log()
  }

  formatLabel(label: string) {
    const labels = ['log', ...Object.keys(LEVELS)]
    if (labels.includes(label) && this.uppercaseLabel) {
      label = label.toUpperCase()
    }
    label = this.wrapLabel ? `[${label}]` : label
    return label
  }

  // level 0
  success(msg?: string, label = 'success') {
    this.log(msg, label, this.colors.success, 0)
  }

  // level 1
  debug(msg?: string, label = 'debug') {
    this.log(msg, label, this.colors.debug, 1)
  }

  // level 2
  info(msg?: string, label = 'info') {
    this.log(msg, label, this.colors.info, 2)
  }

  // level 3
  notice(msg?: string, label = 'notice') {
    this.log(msg, label, this.colors.notice, 3)
  }

  // level 4
  warn(msg?: string, label = 'warn') {
    this.log(msg, label, this.colors.warn, 4)
  }

  // level 5
  error(msg?: string, label = 'error') {
    this.log(msg, label, this.colors.error, 5)
  }
}

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
