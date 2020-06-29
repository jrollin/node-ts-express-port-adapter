import { ProjectRepo } from '../port/ProjectRepo'
import { CreateProjectUseCase } from '../usecase/CreateProjectUseCase'
import { Project } from '../domain/Project'
import { ProjectProps } from '../domain/ProjectProps';
import { LoggerGateway } from '../port/LoggerGateway';

export class CreateProjectService implements CreateProjectUseCase {
  projectRepo: ProjectRepo
  logger: LoggerGateway

  constructor(projectRepo: ProjectRepo, logger: LoggerGateway) {
    this.projectRepo = projectRepo
    this.logger = logger
  }

  createProject(data: ProjectProps): void {
  
    const project = Project.create(data)
    this.projectRepo.saveProject(project)

    this.logger.info('Project created', project)
  }
}
