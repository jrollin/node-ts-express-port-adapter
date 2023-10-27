import * as dotenv from 'dotenv';
import https from 'https';
import * as fs from 'fs';
import pino from 'pino';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { loadConfig } from './config';
import { PinoLoggerGateway } from '@adapters/gateway/PinoLoggerGateway';
import { configureProjectRouter } from '@adapters/http/router/ProjectRouter';
import { InMemoryProjectRepo } from '@adapters/persistence/InMemoryProjectRepo';
import { GetAllProjectsService } from '@core/service/GetAllProjectsService';
import { GetProjectByProjectIdService } from '@core/service/GetProjectByProjectIdService';
import { CreateProjectService } from '@core/service/CreateProjectService';
import { AddCoverToProjectService } from '@core/service/AddCoverToProjectService';
import { FilesystemMediaRepo } from '@adapters/persistence/FilesystemMediaRepo';
import { configUpload } from './uploadConfig';
import { configureDefaultRoutes } from '@adapters/http/router/DefaultRouter';
import { configureErrorHandler } from '@adapters/http/router/ErrorHandler';
import { configureAuthRouter } from '@adapters/http/router/AuthRouter';

// logger
const logger = new PinoLoggerGateway(pino());

// config
dotenv.config();
const {
    PORT,
    SSL_CERT,
    SSL_KEY,
    UPLOAD_TARGET,
    MEDIA_TARGET,
    OPENID_CLIENT_ID,
    OPENID_REDIRECT_URL,
    OPENID_AUTH_URL,
    OPENID_TOKEN_URL,
} = loadConfig(logger);

// express
const app: express.Application = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

// projects repo
const projectRepo = new InMemoryProjectRepo();
projectRepo.loadfakeData();
const mediaRepo = new FilesystemMediaRepo(MEDIA_TARGET, logger);
// projects services
const getAllProjects = new GetAllProjectsService(projectRepo, logger);
const getProjectByProjectIDService = new GetProjectByProjectIdService(
    projectRepo,
    logger,
);
const createProjectService = new CreateProjectService(projectRepo, logger);
const addCoverToProjectService = new AddCoverToProjectService(
    projectRepo,
    mediaRepo,
    logger,
);

// default routes
configureDefaultRoutes(app, MEDIA_TARGET);
// projects routes
const upload = configUpload(UPLOAD_TARGET);
configureProjectRouter(
    app,
    getAllProjects,
    getProjectByProjectIDService,
    createProjectService,
    addCoverToProjectService,
    upload,
);
// auth routes
configureAuthRouter(
    app,
    logger,
    OPENID_CLIENT_ID,
    OPENID_REDIRECT_URL,
    OPENID_AUTH_URL,
    OPENID_TOKEN_URL,
);
// error handler middleware
configureErrorHandler(app, logger);

// server
https
    .createServer(
        {
            key: fs.readFileSync(SSL_KEY),
            cert: fs.readFileSync(SSL_CERT),
        },
        app,
    )
    .listen(PORT, () => {
        logger.info('Started server', { PORT });
        process.on('SIGABRT', cleanTerminate);
        process.on('SIGINT', cleanTerminate);
        process.on('SIGBREAK', cleanTerminate);
    });
// track server termination
const cleanTerminate = (signal: NodeJS.Signals): void => {
    logger.info('cleaning before terminating process ...', { signal });
    process.exit(0);
};
