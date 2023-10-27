import { Project } from '../domain/Project';
import { ProjectId } from '../domain/ProjectId';

export interface ProjectRepo {
    getAllProjects(): Promise<Project[]>;
    getProjectByProjectId(projectID: ProjectId): Promise<Project>;
    saveProject(project: Project): Promise<void>;
}
