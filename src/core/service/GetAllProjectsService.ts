import { GetAllProjectsUseCase } from '../usecase/GetAllProjectsUseCase'
import { Project } from '../domain/Project'
import { ProjectRepo } from '../port/ProjectRepo'

export class GetAllProjectsService implements GetAllProjectsUseCase {
  projectRepo: ProjectRepo

  constructor(projectRepo: ProjectRepo) {
    this.projectRepo = projectRepo
  }

  getAllProjects(): Promise<Project[] | null> {
    return this.projectRepo.getAllProjects()
  }
}
