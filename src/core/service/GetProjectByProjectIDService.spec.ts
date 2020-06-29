import { GetProjectByProjectIDService } from './GetProjectByProjectIDService'
import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo'

describe('GetProjectByProjectIDService', () => {
  let projectRepo: InMemoryProjectRepo
  let service: GetProjectByProjectIDService

  beforeEach(() => {
    projectRepo = new InMemoryProjectRepo()
    service = new GetProjectByProjectIDService(projectRepo)
  })

  it('should return null project when not found', async () => {
    const project = await service.getProjectByProjectID('43')

    expect(project).toBeNull()
  })

  it('should return project if found', async () => {
    projectRepo.loadfakeData()
    const project = await service.getProjectByProjectID('2')

    expect(project?.projectID.toString()).toEqual('2')
  })
})
