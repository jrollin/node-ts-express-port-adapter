import { Project } from '../domain/Project'

export interface ProjectRepo {
  getAllProjects(): Promise<Project[] | null>
}
