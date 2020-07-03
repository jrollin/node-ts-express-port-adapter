import express, {Application, Request, Response} from 'express'
import {GetAllProjectsUseCase} from '../../../core/usecase/GetAllProjectsUseCase'
import {CreateProjectCommand, CreateProjectUseCase} from '../../../core/usecase/CreateProjectUseCase'
import {AddCoverToProjectCommand, AddCoverToProjectUseCase} from '../../../core/usecase/AddCoverToProjectUseCase'
import {GetProjectByProjectIdUseCase} from '../../../core/usecase/GetProjectByProjectIdUseCase'
import {ProjectId} from '../../../core/domain/ProjectId'
import {ProjectMapper} from '../rest/dto/ProjectMapper'
import {ProjectCollectionMapper} from '../rest/dto/ProjectCollectionMapper'
import {Media} from '../../../core/domain/Media'
import asyncHandler from 'express-async-handler'

export const configureProjectRouter = (
    app: Application,
    listAllProjects: GetAllProjectsUseCase,
    getProjectByProjectID: GetProjectByProjectIdUseCase,
    createProject: CreateProjectUseCase,
    addCoverToProject: AddCoverToProjectUseCase,
    upload: any
) => {
    const router = express.Router()

    // get all projects
    router.get('/', async (req: Request, res: Response) => {
        const projects = await listAllProjects.getAllProjects()
        if (!projects) {
            return res.status(200).send({projects: null})
        }
        res.status(200).send(ProjectCollectionMapper.toDTO(projects))
    })

    // get project by id
    router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
        const projectId = ProjectId.create(req.params.id)
        const project = await getProjectByProjectID.getProjectByProjectID(projectId)
        return res.status(200).send(ProjectMapper.toDTO(project))
    }))

    // create project
    router.post('/', asyncHandler(async (req: Request, res: Response) => {
        const {title, description, categoryId} = req.body
        const command = new CreateProjectCommand(title, description, categoryId)
        await createProject.createProject(command)
        return res.sendStatus(201)
    }))

    // upload cover
    router.post('/:id/covers', upload.single('cover'), asyncHandler(async (req: Request, res: Response) => {
        const file: Express.Multer.File = req.file
        const {title} = req.body
        const media: Media = {
            name: file.filename,
            mimeType: file.mimetype,
            path: file.path,
            size: file.size,
        }
        const command = new AddCoverToProjectCommand(req.params.id, media, title)
        await addCoverToProject.addCoverToProject(command)
        return res.sendStatus(201)
    }))

    app.use('/projects', router)
}
