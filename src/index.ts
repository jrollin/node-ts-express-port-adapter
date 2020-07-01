import * as dotenv from 'dotenv'
import pino from 'pino'

// config
dotenv.config()
if (!process.env.PORT) {
  pino().error('PORT is not defined')
  process.exit(1)
}

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { PinoLoggerGateway } from './adapters/gateway/PinoLoggerGateway'
import { configureProjectRouter } from './adapters/http/router/ProjectRouter'
import { InMemoryProjectRepo } from './adapters/persistence/InMemoryProjectRepo'
import { configureDefaultRoutes } from './adapters/http/router/DefaultRouter'
import { GetAllProjectsService } from './core/service/GetAllProjectsService'
import { GetProjectByProjectIDService } from './core/service/GetProjectByProjectIDService'
import { CreateProjectService } from './core/service/CreateProjectService'
import { AddCoverToProjectService } from './core/service/AddCoverToProjectService'
import { InMemoryMediaRepo } from './adapters/persistence/InMemoryMediaRepo'
import { MEDIA_TARGET, upload } from './uploadConfig'
import { ProjectCoverID } from './core/domain/ProjectCoverID';

// logger
const logger = new PinoLoggerGateway(pino())

// express
const app: express.Application = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())

// default routes
configureDefaultRoutes(app)

// projects repo
const projectRepo = new InMemoryProjectRepo()
projectRepo.loadfakeData()
const mediaRepo = new InMemoryMediaRepo(MEDIA_TARGET, logger)
// projects services
const getAllProjects = new GetAllProjectsService(projectRepo, logger)
const getProjectByProjectIDService = new GetProjectByProjectIDService(projectRepo, logger)
const createProjectService = new CreateProjectService(projectRepo, logger)
const addCoverToProjectService = new AddCoverToProjectService(projectRepo, mediaRepo, logger)
// projects routes
configureProjectRouter(
  app,
  getAllProjects,
  getProjectByProjectIDService,
  createProjectService,
  addCoverToProjectService,
  upload,
  logger
)

// server
const PORT: number = parseInt(process.env.PORT as string, 10)
app.listen(PORT, () => {
  logger.info('Started server ', {PORT} )
  process.on('SIGABRT', cleanTerminate)
  process.on('SIGINT', cleanTerminate)
  process.on('SIGBREAK', cleanTerminate)
})
// track server termination
const cleanTerminate = (signal: NodeJS.Signals): void => {
  logger.info('cleaning before terminating process ...', { signal })
  process.exit(0)
}
