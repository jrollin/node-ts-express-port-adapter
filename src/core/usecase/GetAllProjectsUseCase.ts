import { Project } from '../domain/Project'

export interface GetAllProjectsUseCase {
  getAllProjects(): Promise<Project[] | null>
}
