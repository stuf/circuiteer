import winston, { format, transports } from 'winston';

const { combine, timestamp, label, splat, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  const linePrefix = [timestamp, `[${label}]`, level];

  const line = [linePrefix.join(' '), message];

  const out = line.join(': ');

  return out;
});

const loggerOptions = labelName => ({
  format: combine(label({ label: labelName }), splat(), timestamp(), logFormat),
  transports: [new transports.Console()],
});

const createLogger = name => {
  winston.loggers.add(name, loggerOptions(name));

  const logger = winston.loggers.get(name);

  return logger;
};

export const getLogger = name => {
  if (!winston.loggers.has(name)) {
    winston.loggers.add(name, loggerOptions(name));
  }

  return winston.loggers.get(name);
};

export const appLog = createLogger('app');
export const canvasLog = createLogger('canvas');
export const storeLog = createLogger('store');
