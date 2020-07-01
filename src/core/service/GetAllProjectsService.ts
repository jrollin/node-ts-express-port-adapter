import { GetAllProjectsUseCase } from '../usecase/GetAllProjectsUseCase'
import { Project } from '../domain/Project'
import { ProjectRepo } from '../port/ProjectRepo'
import { LoggerGateway } from '../port/LoggerGateway';

export class GetAllProjectsService implements GetAllProjectsUseCase {
  projectRepo: ProjectRepo

  constructor(projectRepo: ProjectRepo, logger: LoggerGateway) {
    this.projectRepo = projectRepo
  }

  getAllProjects(): Promise<Project[]> {
    return this.projectRepo.getAllProjects()
  }
}
