import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo'
import { GetAllProjectsService } from './GetAllProjectsService'

describe('GetAllProjectsService', () => {
  let projectRepo: InMemoryProjectRepo
  let service: GetAllProjectsService

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo()
    service = new GetAllProjectsService(projectRepo)
  })

  

  it('should send empty project collection when no data', async () => {
    const projects = await service.getAllProjects()

    expect(projects).toHaveLength(0)
  })

  it('should send 2 elements in project collection', async () => {
    projectRepo.loadfakeData()
    const projects = await service.getAllProjects()

    expect(projects).toHaveLength(2)
  })
})
