import { Project } from '../domain/Project'
import { ProjectRepo } from '../port/ProjectRepo'
import { GetProjectByProjectIDUseCase } from '../usecase/GetProjectByProjectIDUseCase'
import { ProjectID } from '../domain/ProjectID'
import { LoggerGateway } from '../port/LoggerGateway';

export class GetProjectByProjectIDService implements GetProjectByProjectIDUseCase {
  projectRepo: ProjectRepo

  constructor(projectRepo: ProjectRepo, logger: LoggerGateway) {
    this.projectRepo = projectRepo
  }
  async getProjectByProjectID(projectID: ProjectID): Promise<Project> {
    return await this.projectRepo.getProjectByProjectID(projectID)
  }
}
