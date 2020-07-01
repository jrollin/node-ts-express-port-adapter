import { Project } from '../../core/domain/Project'
import { ProjectID } from '../../core/domain/ProjectID'
import { ProjectRepo } from '../../core/port/ProjectRepo'
import { ProjectFixture } from '../../fixtures/ProjectFixture';

export class InMemoryProjectRepo implements ProjectRepo {
  projects: Map<string, Project> = new Map()

  loadfakeData(): void {
    const projectDraft = ProjectFixture.draftProjectWithCategory()
    const projectPublished = ProjectFixture.publishedProjectWithCategory()
    // store in set
    this.projects.set(projectDraft.projectID.toString(), projectDraft)
    this.projects.set(projectPublished.projectID.toString(), projectPublished)
  }

  getAllProjects(): Promise<Project[]> {
    const projects: Project[] = [...this.projects.values()]
    return Promise.resolve(projects)
  }

  getProjectByProjectID(projectID: ProjectID): Promise<Project | null> {
    const project = this.projects.get(projectID.toString())
    if (!project) {
      return Promise.resolve(null)
    }
    return Promise.resolve(project)
  }


  saveProject (project: Project): Promise<void> {
    this.projects.set(project.projectID.toString(), project)
    return Promise.resolve()
  }
  
}
