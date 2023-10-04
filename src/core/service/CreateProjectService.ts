import { ProjectRepo } from '../port/ProjectRepo';
import {
  CreateProjectUseCase,
  CreateProjectCommand,
} from '../usecase/CreateProjectUseCase';
import { Project } from '../domain/Project';
import { LoggerGateway } from '../port/LoggerGateway';

export class CreateProjectService implements CreateProjectUseCase {
  projectRepo: ProjectRepo;
  logger: LoggerGateway;

  constructor(projectRepo: ProjectRepo, logger: LoggerGateway) {
    this.projectRepo = projectRepo;
    this.logger = logger;
  }

  async createProject(command: CreateProjectCommand): Promise<void> {
    const project = Project.create(command.getProjecProps());
    await this.projectRepo.saveProject(project);

    this.logger.info('Project created', project);

    return Promise.resolve();
  }
}
