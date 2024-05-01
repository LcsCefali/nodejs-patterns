import winston from 'winston';
const { combine, timestamp, colorize, json, printf, prettyPrint } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize({ all: true,  }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [new winston.transports.Console()],
});

export const loggerJson = winston.createLogger({
  level: 'info',
  format: combine(
    json(),
    prettyPrint({ colorize: true })
  ),
  transports: [new winston.transports.Console()],
});