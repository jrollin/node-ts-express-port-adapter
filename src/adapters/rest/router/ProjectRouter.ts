import express, { Request, Response, Application } from 'express'
import { GetAllProjectsUseCase } from '../../../core/usecase/GetAllProjectsUseCase'
import { CreateProjectUseCase } from '../../../core/usecase/CreateProjectUseCase'
import { GetProjectByProjectIDUseCase } from '../../../core/usecase/GetProjectByProjectIDUseCase'
import { ProjectID } from '../../../core/domain/ProjectID'
import { ProjectMapper } from '../dto/ProjectMapper'
import { ProjectCollectionMapper } from '../dto/ProjectCollectionMapper'
import { ValidationError } from '../../../core/domain/ValidationError'
import { LoggerGateway } from '../../../core/port/LoggerGateway';

export const configureProjectRouter = (
  app: Application,
  listAllProjects: GetAllProjectsUseCase,
  getProjectByProjectID: GetProjectByProjectIDUseCase,
  createProject: CreateProjectUseCase,
  logger: LoggerGateway
) => {
  const router = express.Router()

  // get all projects
  router.get('/', async (req: Request, res: Response) => {
    const projects = await listAllProjects.getAllProjects()
    if (!projects) {
      return res.status(200).send({ projects: null })
    }
    res.status(200).send(ProjectCollectionMapper.toDTO(projects))
  })

  // get project by id
  router.get('/:id', async (req: Request, res: Response) => {
    const projectID = ProjectID.create(req.params.id)
    const project = await getProjectByProjectID.getProjectByProjectID(projectID)
    if (!project) {
      return res.sendStatus(404)
    }
    res.status(200).send(ProjectMapper.toDTO(project))
  })

  // create project
  router.post('/', async (req: Request, res: Response) => {
    try {
      await createProject.createProject(req.body)
    } catch (err) {
      if (err instanceof ValidationError) {
        logger.warn('Validation error when creating project', err)
        return res.status(422).send(err.getErrors())
      } else {
        logger.error('Error when creating project', err)
        throw err
      }
    }
    return res.sendStatus(201)
  })

  app.use('/projects', router)
}
