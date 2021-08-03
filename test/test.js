const { Logger } = require('../dist/index.js')

// logger
const logger = new Logger({})

logger.log('This is a normal log.')
logger.info('This is an info log.')
logger.debug('This is a debug log.')
logger.notice('This is a notice log.')
logger.warn('This is a warn log.')
logger.error('This is an error log.')
logger.success('This is a success log.')

// Custom Display Format
const formatLogger = new Logger({
  format: '[datetime] - [label] - [msg]',
  wrapLabel: true,
  uppercaseLabel: true,
  msgColor: true
})

formatLogger.enter()
formatLogger.log('This is a normal log.')
formatLogger.info('This is an info log.')
formatLogger.debug('This is a debug log.')
formatLogger.notice('This is a notice log.')
formatLogger.warn('This is a warn log.')
formatLogger.error('This is an error log.')
formatLogger.success('This is a success log.')

// Custom Colors
const colors = require('kolorist')

const colorLogger = new Logger({
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

colorLogger.enter()
colorLogger.info('This is an info log.')
colorLogger.debug('This is a debug log.')
colorLogger.notice('This is a notice log.')
colorLogger.warn('This is a warn log.')
colorLogger.error('This is an error log.')
colorLogger.success('This is a success log.')
