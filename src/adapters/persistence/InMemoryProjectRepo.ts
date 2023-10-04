import { Project } from '../../core/domain/Project';
import { ProjectId } from '../../core/domain/ProjectId';
import { ProjectRepo } from '../../core/port/ProjectRepo';
import { ProjectFixture } from '../../fixtures/ProjectFixture';
import { ProjectNotFound } from '../../core/port/ProjectNotFound';

export class InMemoryProjectRepo implements ProjectRepo {
  projects: Map<string, Project> = new Map();

  loadfakeData(): void {
    const projectDraft = ProjectFixture.draftProjectWithCategory();
    const projectPublished = ProjectFixture.publishedProjectWithCategory();
    // store in set
    this.projects.set(
      projectDraft.projectId
        ? projectDraft.projectId.toString()
        : ProjectId.create().toString(),
      projectDraft,
    );
    this.projects.set(
      projectPublished.projectId
        ? projectPublished.projectId.toString()
        : ProjectId.create().toString(),
      projectPublished,
    );
  }

  async getAllProjects(): Promise<Project[]> {
    const projects: Project[] = [...this.projects.values()];
    return Promise.resolve(projects);
  }

  async getProjectByProjectId(projectId: ProjectId): Promise<Project> {
    const project = this.projects.get(projectId.toString());
    if (!project) {
      throw new ProjectNotFound('Project not found');
    }
    return Promise.resolve(project);
  }

  async saveProject(project: Project): Promise<void> {
    this.projects.set(project.projectId.toString(), project);

    return Promise.resolve();
  }
}
