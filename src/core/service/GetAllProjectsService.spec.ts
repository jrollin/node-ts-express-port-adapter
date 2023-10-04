import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo';
import { GetAllProjectsService } from './GetAllProjectsService';
import { InMemoryLoggerGateway } from '../../adapters/gateway/InMemoryLoggerGateway';

describe('GetAllProjectsService', () => {
  let projectRepo: InMemoryProjectRepo;
  let service: GetAllProjectsService;
  let logger: InMemoryLoggerGateway;

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo();
    logger = new InMemoryLoggerGateway();
    service = new GetAllProjectsService(projectRepo, logger);
  });

  it('send empty collection when no project found', async () => {
    const projects = await service.getAllProjects();

    expect(projects).toHaveLength(0);
  });

  it('send 2 elements in project collection', async () => {
    projectRepo.loadfakeData();
    const projects = await service.getAllProjects();

    expect(projects).toHaveLength(2);
  });
});
