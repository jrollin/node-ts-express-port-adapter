export interface LoggerGateway {
    info(msg: string, context?: object): void;
    warn(msg: string, context?: object): void;
    error(msg: string, context?: object): void;
}
