import { Project } from '../domain/Project'
import { ProjectID } from '../domain/ProjectID'

export interface ProjectRepo {
  getAllProjects(): Promise<Project[] | null>
  getProjectByProjectID(projectID: ProjectID): Promise<Project | null>
  saveProject(project: Project): void;
}
