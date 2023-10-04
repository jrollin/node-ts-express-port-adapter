import { Project } from '../domain/Project';
import { ProjectRepo } from '../port/ProjectRepo';
import { GetProjectByProjectIdUseCase } from '../usecase/GetProjectByProjectIdUseCase';
import { ProjectId } from '../domain/ProjectId';
import { LoggerGateway } from '../port/LoggerGateway';

export class GetProjectByProjectIdService
  implements GetProjectByProjectIdUseCase
{
  projectRepo: ProjectRepo;
  logger: LoggerGateway;

  constructor(projectRepo: ProjectRepo, logger: LoggerGateway) {
    this.projectRepo = projectRepo;
    this.logger = logger;
  }
  async getProjectByProjectID(projectId: ProjectId): Promise<Project> {
    return await this.projectRepo.getProjectByProjectId(projectId);
  }
}
