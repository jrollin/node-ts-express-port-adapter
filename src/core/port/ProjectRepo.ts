import { Project } from '../domain/Project'
import { ProjectID } from '../domain/ProjectID'

export interface ProjectRepo {
  getAllProjects(): Promise<Project[]>
  getProjectByProjectID(projectID: ProjectID): Promise<Project | null>
  saveProject(project: Project): Promise<void>
}
