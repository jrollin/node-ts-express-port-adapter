import { GetAllProjectsUseCase } from '../usecase/GetAllProjectsUseCase'
import { Project } from '../domain/Project'
import { ProjectRepo } from '../port/ProjectRepo'
import { LoggerGateway } from '../port/LoggerGateway';

export class GetAllProjectsService implements GetAllProjectsUseCase {
  projectRepo: ProjectRepo

  constructor(projectRepo: ProjectRepo, logger: LoggerGateway) {
    this.projectRepo = projectRepo
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepo.getAllProjects()
  }
}
