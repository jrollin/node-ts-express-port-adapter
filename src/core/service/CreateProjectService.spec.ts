import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo';
import { CreateProjectService } from './CreateProjectService';
import { InMemoryLoggerGateway } from '../../adapters/gateway/InMemoryLoggerGateway';
import { CreateProjectCommand } from '../usecase/CreateProjectUseCase';

describe('CreateProjectService', () => {
  let projectRepo: InMemoryProjectRepo;
  let service: CreateProjectService;
  let logger: InMemoryLoggerGateway;

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo();
    logger = new InMemoryLoggerGateway();
    service = new CreateProjectService(projectRepo, logger);
  });

  it('can create project', async () => {
    const command: CreateProjectCommand = new CreateProjectCommand(
      'test',
      'description',
      '1',
    );
    const res = await service.createProject(command);

    expect(res).toBeUndefined();
    expect(await projectRepo.getAllProjects()).toHaveLength(1);
  });
});
