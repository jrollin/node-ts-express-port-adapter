import { InMemoryProjectRepo } from '../../adapters/persistence/InMemoryProjectRepo'
import { InMemoryLoggerGateway } from '../../adapters/gateway/InMemoryLoggerGateway'
import { AddCoverToProjectService } from './AddCoverToProjectService'
import { InMemoryMediaRepo } from '../../adapters/persistence/InMemoryMediaRepo'
import { AddCoverToProjectCommand } from '../usecase/AddCoverToProjectUseCase'
import { Media } from '../domain/Media'
import { ProjectNotFound } from '../port/ProjectNotFound'

describe('AddCoverToProjectService', () => {
  let projectRepo: InMemoryProjectRepo
  let mediaRepo: InMemoryMediaRepo
  let service: AddCoverToProjectService
  let logger: InMemoryLoggerGateway

  beforeEach(() => {
    logger = new InMemoryLoggerGateway()
    projectRepo = new InMemoryProjectRepo()
    mediaRepo = new InMemoryMediaRepo()
    service = new AddCoverToProjectService(projectRepo, mediaRepo, logger)
  })

  it('throw exception if project not', async () => {
    const media: Media = {
      name: 'fake',
      mimeType: 'image/jpeg',
      path: 'fakepath',
      size: 23,
    }
    const command: AddCoverToProjectCommand = new AddCoverToProjectCommand('nobody', media, 'title')

    try {
      await service.addCoverToProject(command)
      fail('exception not thrown')
    } catch (err) {
      expect(err).toBeInstanceOf(ProjectNotFound)
    }
  })

  it('can add cover to project', async () => {
    projectRepo.loadfakeData()

    const media: Media = {
      name: 'fake',
      mimeType: 'image/jpeg',
      path: 'fakepath',
      size: 23,
    }
    const command: AddCoverToProjectCommand = new AddCoverToProjectCommand('project1', media, 'title')
    const res = await service.addCoverToProject(command)

    expect(res).toBeUndefined()
    expect(await mediaRepo.getMedias()).toHaveLength(1)
    expect(await projectRepo.getAllProjects()).toHaveLength(2)
  })
})
