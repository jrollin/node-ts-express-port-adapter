import express, { Request, Response, Application } from 'express'
import { GetAllProjectsUseCase } from '../../../core/usecase/GetAllProjectsUseCase'
import { CreateProjectUseCase, CreateProjectCommand } from '../../../core/usecase/CreateProjectUseCase'
import { AddCoverToProjectCommand, AddCoverToProjectUseCase } from '../../../core/usecase/AddCoverToProjectUseCase'
import { GetProjectByProjectIDUseCase } from '../../../core/usecase/GetProjectByProjectIDUseCase'
import { ProjectID } from '../../../core/domain/ProjectID'
import { ProjectMapper } from '../rest/dto/ProjectMapper'
import { ProjectCollectionMapper } from '../rest/dto/ProjectCollectionMapper'
import { ValidationError } from '../../../core/domain/ValidationError'
import { LoggerGateway } from '../../../core/port/LoggerGateway'
import { Media } from '../../../core/domain/Media';

export const configureProjectRouter = (
  app: Application,
  listAllProjects: GetAllProjectsUseCase,
  getProjectByProjectID: GetProjectByProjectIDUseCase,
  createProject: CreateProjectUseCase,
  addCoverToProject: AddCoverToProjectUseCase,
  upload: any,
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
      const { title, description, categoryID } = req.body
      const command = new CreateProjectCommand(title, description, categoryID)
      await createProject.createProject(command)
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

  // upload cover
  router.post('/:id/covers', upload.single('cover'), async (req: Request, res: Response) => {
    const file: Express.Multer.File = req.file
    const { title } = req.body
    const media: Media = {
      name: file.filename,
      mimeType: file.mimetype,
      path: file.path,
      size: file.size,
    }
    const command = new AddCoverToProjectCommand(req.params.id, media, title)
    await addCoverToProject.addCoverToProject(command)

    return res.sendStatus(201)
  })

  app.use('/projects', router)
}


