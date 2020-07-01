import { GetProjectByProjectIDService } from './GetProjectByProjectIDService'
import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo'
import { InMemoryLoggerGateway } from '../../adapters/gateway/InMemoryLoggerGateway';

describe('GetProjectByProjectIDService', () => {
  let projectRepo: InMemoryProjectRepo
  let service: GetProjectByProjectIDService
  let logger: InMemoryLoggerGateway

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo()
    logger = new InMemoryLoggerGateway()
    service = new GetProjectByProjectIDService(projectRepo, logger)
  })

  it('should return null project when not found', async () => {
    const project = await service.getProjectByProjectID('43')

    expect(project).toBeNull()
  })

  it('should return project if found', async () => {
    projectRepo.loadfakeData()
    const project = await service.getProjectByProjectID('project2')

    expect(project?.projectID.toString()).toEqual('project2')
  })
})
