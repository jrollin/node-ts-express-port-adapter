import express, { Request, Response, Application } from 'express'
import { GetAllProjectsUseCase } from '../../core/usecase/GetAllProjectsUseCase'
import { ProjectsMap } from './dto/ProjectsMap'

export const configureProjectRouter = (app: Application, listAllProjects: GetAllProjectsUseCase) => {
  const router = express.Router()

  // projects
  router.get('/', async (req: Request, res: Response) => {
    const projects = await listAllProjects.getAllProjects()
    if (!projects) {
      return res.status(200).send({ projects: null })
    }
    res.status(200).send(ProjectsMap.toDTO(projects))
  })
  router.get('/:id', async (req: Request, res: Response) => {
      console.log('TODO : get project with id: ' + req.params.id)
      res.status(504).send('not implemented')
  })

  app.use('/projects', router)
}
