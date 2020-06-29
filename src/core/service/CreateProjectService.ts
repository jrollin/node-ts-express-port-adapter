import { GetAllProjectsUseCase } from '../usecase/GetAllProjectsUseCase'
import { ProjectRepo } from '../port/ProjectRepo'
import { CreateProjectUseCase } from '../usecase/CreateProjectUseCase'
import { Project } from '../domain/Project'
import { ProjectID } from '../domain/ProjectID'
import { ProjectProps } from '../domain/ProjectProps';

export class CreateProjectService implements CreateProjectUseCase {
  projectRepo: ProjectRepo

  constructor(projectRepo: ProjectRepo) {
    this.projectRepo = projectRepo
  }

  createProject(data: ProjectProps): void {
  
    const project = Project.create(data)
    this.projectRepo.saveProject(project)
  }
}
