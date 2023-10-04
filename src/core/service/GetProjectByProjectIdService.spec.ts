import { GetProjectByProjectIdService } from './GetProjectByProjectIdService';
import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo';
import { InMemoryLoggerGateway } from '../../adapters/gateway/InMemoryLoggerGateway';
import { ProjectNotFound } from '../port/ProjectNotFound';

describe('GetProjectByProjectIdService', () => {
  let projectRepo: InMemoryProjectRepo;
  let service: GetProjectByProjectIdService;
  let logger: InMemoryLoggerGateway;

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo();
    logger = new InMemoryLoggerGateway();
    service = new GetProjectByProjectIdService(projectRepo, logger);
  });

  it('throw exception when project not found', async () => {
    try {
      await service.getProjectByProjectID('43');
      fail('exception not thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(ProjectNotFound);
    }
  });

  it('send project if found', async () => {
    projectRepo.loadfakeData();
    const project = await service.getProjectByProjectID('project2');

    expect(project?.projectId.toString()).toEqual('project2');
  });
});
