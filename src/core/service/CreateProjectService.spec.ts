import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo'
import { CreateProjectService } from './CreateProjectService'
import { InMemoryLoggerGateway } from '../../adapters/gateway/InMemoryLoggerGateway';

describe('CreateProjectService', () => {
  let projectRepo: InMemoryProjectRepo
  let service: CreateProjectService
  let logger: InMemoryLoggerGateway

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo()
    logger = new InMemoryLoggerGateway()
    service = new CreateProjectService(projectRepo, logger)
  })

  describe.each([[{ title: '' }], [{ title: 'te' }]])('create project with invalid data should fails', (data) => {
    test(`with data ${JSON.stringify(data)}`, () => {
      expect(() => {
        service.createProject(data)
      }).toThrow()
    })
  })

  it('should create project', async () => {
    const res = await service.createProject({ title: 'data' })

    expect(res).toBeUndefined()
    expect(await projectRepo.getAllProjects()).toHaveLength(1)
  })
})
