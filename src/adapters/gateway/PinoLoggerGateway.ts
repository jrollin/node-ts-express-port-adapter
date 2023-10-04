import { LoggerGateway } from '../../core/port/LoggerGateway';

export class PinoLoggerGateway implements LoggerGateway {
  constructor(private pino: any) {}
  info(msg: string, context?: object): void {
    if (!context) {
      this.pino.info(msg);
    } else {
      this.pino.info(context, msg);
    }
  }
  warn(msg: string, context?: object): void {
    if (!context) {
      this.pino.warn(msg);
    } else {
      this.pino.warn(context, msg);
    }
  }
  error(msg: string, context?: object): void {
    if (!context) {
      this.pino.error(msg);
    } else {
      this.pino.error(context, msg);
    }
  }
}
