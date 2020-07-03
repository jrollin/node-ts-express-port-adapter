import { Project } from '../domain/Project'
import { ProjectId } from '../domain/ProjectId';

export interface GetProjectByProjectIdUseCase {
  getProjectByProjectID(projectId: ProjectId): Promise<Project>
}
