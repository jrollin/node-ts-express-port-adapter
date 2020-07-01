import { ProjectRepo } from '../port/ProjectRepo'
import { Project } from '../domain/Project'
import { LoggerGateway } from '../port/LoggerGateway'
import { AddCoverToProjectCommand, AddCoverToProjectUseCase } from '../usecase/AddCoverToProjectUseCase'
import { ProjectCover } from '../domain/ProjectCover'
import { ProjectCoverProps } from '../domain/ProjectCoverProps'
import { MediaRepo } from '../port/MediaRepo';

export class AddCoverToProjectService implements AddCoverToProjectUseCase {
  projectRepo: ProjectRepo
  mediaRepo: MediaRepo
  logger: LoggerGateway

  constructor(projectRepo: ProjectRepo, mediaRepo: MediaRepo, logger: LoggerGateway) {
    this.projectRepo = projectRepo
    this.mediaRepo = mediaRepo
    this.logger = logger
  }

  async addCoverToProject(command: AddCoverToProjectCommand): Promise<void> {
    // project
    const project: Project = await this.projectRepo.getProjectByProjectID(command.projectID)

    // add cover to project
    const coverProps: ProjectCoverProps = command.getProjectCover()
    const projectCover = ProjectCover.create(coverProps)
    
    // move file to destination
    await this.mediaRepo.saveMedia(coverProps.cover, projectCover.filename)

    // add cover to project
    project.addCover(projectCover)

    // persist
    await this.projectRepo.saveProject(project)

    // notify ?
    this.logger.info('Project cover added')

    return Promise.resolve()
  }
}
