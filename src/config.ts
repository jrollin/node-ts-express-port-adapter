import { LoggerGateway } from '@core/port/LoggerGateway';
import path from 'path';

export const loadConfig = (logger: LoggerGateway) => {
    // Server
    if (!process.env.PORT) {
        logger.error('PORT is not defined');
        process.exit(1);
    }
    // SSL
    if (!process.env.SSL_KEY) {
        logger.error('SSL_KEY is not defined');
        process.exit(1);
    }
    if (!process.env.SSL_CERT) {
        logger.error('SSL_CERT is not defined');
        process.exit(1);
    }
    // media
    if (!process.env.UPLOAD_TARGET) {
        logger.error('UPLOAD_TARGET is not defined');
        process.exit(1);
    }
    if (!process.env.MEDIA_TARGET) {
        logger.error('MEDIA_TARGET is not defined');
        process.exit(1);
    }
    if (!process.env.MEDIA_URL) {
        logger.error('MEDIA_URL is not defined');
        process.exit(1);
    }

    // authentication
    if (!process.env.OPENID_CLIENT_ID) {
        logger.error('OPENID_CLIENT_ID is not defined');
        process.exit(1);
    }
    if (!process.env.OPENID_REDIRECT_URL) {
        logger.error('OPENID_REDIRECT_URL is not defined');
        process.exit(1);
    }
    if (!process.env.OPENID_AUTH_URL) {
        logger.error('OPENID_AUTH_URL is not defined');
        process.exit(1);
    }
    if (!process.env.OPENID_TOKEN_URL) {
        logger.error('OPENID_TOKEN_URL is not defined');
        process.exit(1);
    }

    const MEDIA_TARGET = path.join(
        path.dirname(__dirname),
        process.env.MEDIA_TARGET,
    );
    const UPLOAD_TARGET = path.join(
        path.dirname(__dirname),
        process.env.UPLOAD_TARGET,
    );

    return {
        PORT: process.env.PORT,
        MEDIA_TARGET,
        UPLOAD_TARGET,
        MEDIA_URL: process.env.MEDIA_URL,
        SSL_KEY: process.env.SSL_KEY,
        SSL_CERT: process.env.SSL_CERT,
        OPENID_CLIENT_ID: process.env.OPENID_CLIENT_ID,
        OPENID_REDIRECT_URL: process.env.OPENID_REDIRECT_URL,
        OPENID_AUTH_URL: process.env.OPENID_AUTH_URL,
        OPENID_TOKEN_URL: process.env.OPENID_TOKEN_URL,
    };
};
