import { Project } from '../../core/domain/Project'
import { ProjectID } from '../../core/domain/ProjectID'
import { ProjectRepo } from '../../core/port/ProjectRepo'
import { ProjectFixture } from '../../fixtures/ProjectFixture';
import { ProjectNotFound } from '../../core/port/ProjectNotFound';

export class InMemoryProjectRepo implements ProjectRepo {
  projects: Map<string, Project> = new Map()

  loadfakeData(): void {
    const projectDraft = ProjectFixture.draftProjectWithCategory()
    const projectPublished = ProjectFixture.publishedProjectWithCategory()
    // store in set
    this.projects.set(projectDraft.projectID ? projectDraft.projectID.toString(): ProjectID.create().toString(), projectDraft)
    this.projects.set(projectPublished.projectID ? projectPublished.projectID.toString(): ProjectID.create().toString(), projectPublished)
  }

  async getAllProjects(): Promise<Project[]> {
    const projects: Project[] = [...this.projects.values()]
    return Promise.resolve(projects)
  }

  async getProjectByProjectID(projectID: ProjectID): Promise<Project> {
    const project = this.projects.get(projectID.toString())
    if (!project) {
      throw new ProjectNotFound('Project not found')
    }
    return Promise.resolve(project)
  }


  async saveProject (project: Project): Promise<void> {

    this.projects.set(project.projectID.toString(), project)
    
    return Promise.resolve()
  }

  
}
