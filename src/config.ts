import {LoggerGateway} from './core/port/LoggerGateway';
import path from "path";

export const checkConfig = (logger: LoggerGateway) => {

    // check config
    if (!process.env.PORT) {
        logger.error('PORT is not defined')
        process.exit(1)
    }
    if (!process.env.UPLOAD_TARGET) {
        logger.error('UPLOAD_TARGET is not defined')
        process.exit(1)
    }
    if (!process.env.MEDIA_TARGET) {
        logger.error('MEDIA_TARGET is not defined')
        process.exit(1)
    }
    if (!process.env.MEDIA_URL) {
        logger.error('MEDIA_URL is not defined')
        process.exit(1)
    }
    if (!process.env.SSL_KEY) {
        logger.error('SSL_KEY is not defined')
        process.exit(1)
    }
    if (!process.env.SSL_CERT) {
        logger.error('SSL_CERT is not defined')
        process.exit(1)
    }

    const MEDIA_TARGET = path.join(path.dirname(__dirname), process.env.MEDIA_TARGET);
    const UPLOAD_TARGET = path.join(path.dirname(__dirname),  process.env.UPLOAD_TARGET);

    return {
        PORT: process.env.PORT,
        MEDIA_TARGET,
        UPLOAD_TARGET,
        MEDIA_URL: process.env.MEDIA_URL,
        SSL_KEY: process.env.SSL_KEY,
        SSL_CERT: process.env.SSL_CERT,
    }

}
