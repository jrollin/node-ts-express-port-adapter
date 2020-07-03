import * as dotenv from 'dotenv'
import pino from 'pino'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import {PinoLoggerGateway} from './adapters/gateway/PinoLoggerGateway'
import {configureProjectRouter} from './adapters/http/router/ProjectRouter'
import {InMemoryProjectRepo} from './adapters/persistence/InMemoryProjectRepo'
import {GetAllProjectsService} from './core/service/GetAllProjectsService'
import {GetProjectByProjectIdService} from './core/service/GetProjectByProjectIdService'
import {CreateProjectService} from './core/service/CreateProjectService'
import {AddCoverToProjectService} from './core/service/AddCoverToProjectService'
import {FilesystemMediaRepo} from './adapters/persistence/FilesystemMediaRepo'
import {upload} from './uploadConfig'
import {configureDefaultRoutes} from './adapters/http/router/DefaultRouter'
import {configureErrorHandler} from './adapters/http/router/ErrorHandler';
import {configureAuthRouter} from './adapters/http/router/AuthRouter';

// config
dotenv.config()

if (!process.env.PORT) {
  pino().error('PORT is not defined')
  process.exit(1)
}
if (!process.env.MEDIA_URL) {
  pino().error('MEDIA_URL is not defined')
  process.exit(1)
}

// logger
const logger = new PinoLoggerGateway(pino())

// express
const app: express.Application = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())


// projects repo
const projectRepo = new InMemoryProjectRepo()
projectRepo.loadfakeData()
const mediaRepo = new FilesystemMediaRepo(process.env.MEDIA_URL, logger)
// // projects services
const getAllProjects = new GetAllProjectsService(projectRepo, logger)
const getProjectByProjectIDService = new GetProjectByProjectIdService(projectRepo, logger)
const createProjectService = new CreateProjectService(projectRepo, logger)
const addCoverToProjectService = new AddCoverToProjectService(projectRepo, mediaRepo, logger)

// routes
configureDefaultRoutes(app)
configureProjectRouter(
    app,
    getAllProjects,
    getProjectByProjectIDService,
    createProjectService,
    addCoverToProjectService,
    upload
)
configureAuthRouter(app, logger)
// error handler middleware
configureErrorHandler(app, logger)

// // server
const PORT: number = parseInt(process.env.PORT as string, 10)
app.listen(PORT, () => {
  logger.info('Started server', {PORT})
  process.on('SIGABRT', cleanTerminate)
  process.on('SIGINT', cleanTerminate)
  process.on('SIGBREAK', cleanTerminate)
})
// track server termination
const cleanTerminate = (signal: NodeJS.Signals): void => {
  logger.info('cleaning before terminating process ...', { signal })
  process.exit(0)
}
