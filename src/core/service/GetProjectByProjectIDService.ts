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
  getProjectByProjectID(projectID: ProjectID): Promise<Project | null> {
    return this.projectRepo.getProjectByProjectID(projectID)
  }
}
