import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import pino from 'pino'

import * as dotenv from 'dotenv'
import { configureProjectRouter } from './adapters/rest/router/ProjectRouter'
import { InMemoryProjectRepo } from './adapters/persistence/InMemoryProjectRepo'
import { configureDefaultRoutes } from './adapters/rest/router/DefaultRouter'
import { GetAllProjectsService } from './core/service/GetAllProjectsService'
import { GetProjectByProjectIDService } from './core/service/GetProjectByProjectIDService'
import { CreateProjectService } from './core/service/CreateProjectService'
import { PinoLoggerGateway } from './adapters/gateway/PinoLoggerGateway';

// config
dotenv.config()
if (!process.env.PORT) {
  process.exit(1)
}

const app: express.Application = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())

// logger
const logger = new PinoLoggerGateway(pino())

// default routes
configureDefaultRoutes(app)

// projects routes
const projectRepo = new InMemoryProjectRepo()
projectRepo.loadfakeData()
const getAllProjects = new GetAllProjectsService(projectRepo, logger)
const getProjectByProjectIDService = new GetProjectByProjectIDService(projectRepo, logger)
const createProjectService = new CreateProjectService(projectRepo, logger)
configureProjectRouter(app, getAllProjects, getProjectByProjectIDService, createProjectService, logger)

// server
const PORT: number = parseInt(process.env.PORT as string, 10)
app.listen(PORT, () => {
  process.on('SIGABRT', cleanTerminate)
  process.on('SIGINT', cleanTerminate)
  process.on('SIGBREAK', cleanTerminate)
})
// track server termination
const cleanTerminate = (signal: NodeJS.Signals): void => {
  logger.info('cleaning before terminating process ...', { signal })
  process.exit(0)
}
