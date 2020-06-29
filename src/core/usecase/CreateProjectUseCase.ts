import { ProjectProps } from '../domain/ProjectProps'

export interface CreateProjectUseCase {
  createProject(data: ProjectProps): void
}
