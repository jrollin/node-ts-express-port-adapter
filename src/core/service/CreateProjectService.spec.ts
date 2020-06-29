import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo'
import { CreateProjectService } from './CreateProjectService'

describe('CreateProjectService', () => {
  let projectRepo: InMemoryProjectRepo
  let service: CreateProjectService

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo()
    service = new CreateProjectService(projectRepo)
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
