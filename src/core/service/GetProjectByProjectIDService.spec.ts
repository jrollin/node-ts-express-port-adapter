import { GetProjectByProjectIDService } from './GetProjectByProjectIDService'
import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo'
import { InMemoryLoggerGateway } from '../../adapters/gateway/InMemoryLoggerGateway'
import { ProjectNotFound } from '../port/ProjectNotFound'

describe('GetProjectByProjectIDService', () => {
  let projectRepo: InMemoryProjectRepo
  let service: GetProjectByProjectIDService
  let logger: InMemoryLoggerGateway

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo()
    logger = new InMemoryLoggerGateway()
    service = new GetProjectByProjectIDService(projectRepo, logger)
  })

  it('throw exception when project not found', async () => {
    try {
      await service.getProjectByProjectID('43')
      fail('exception not thrown')
    } catch (err) {
      expect(err).toBeInstanceOf(ProjectNotFound)
    }
  })

  it('send project if found', async () => {
    projectRepo.loadfakeData()
    const project = await service.getProjectByProjectID('project2')

    expect(project?.projectID.toString()).toEqual('project2')
  })
})
