import { Project } from '../domain/Project'
import { ProjectID } from '../domain/ProjectID';

export interface GetProjectByProjectIDUseCase {
  getProjectByProjectID(projectID: ProjectID): Promise<Project | null>
}
