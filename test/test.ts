import { Logger } from '../src'

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
