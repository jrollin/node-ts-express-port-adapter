import {LoggerGateway} from '../../core/port/LoggerGateway'

interface LogMessage {
  level: string
  msg: string
  context?: object
}

export class InMemoryLoggerGateway implements LoggerGateway {
  logs: LogMessage[] = []

  info(msg: string, context?: object): void {
    this.logs.push({ level: 'info', msg, context } as LogMessage)
  }
  warn(msg: string, context?: object): void {
    this.logs.push({ level: 'warn', msg, context } as LogMessage)
  }
  error(msg: string, context?: object): void {
    this.logs.push({ level: 'error', msg, context } as LogMessage)
  }

  getLogs(): LogMessage[] {
    return this.logs
  }
}
