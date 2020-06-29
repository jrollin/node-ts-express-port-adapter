import { Project } from '../../core/domain/Project'
import { ProjectID } from '../../core/domain/ProjectID'
import { ProjectRepo } from '../../core/port/ProjectRepo'

export class InMemoryProjectRepo implements ProjectRepo {
  projects: Map<string, Project> = new Map()

  loadfakeData(): void {
    this.projects.set(ProjectID.create('1').toString(), Project.create({title: 'Mon titre 1!'}, ProjectID.create('1')))
    this.projects.set(ProjectID.create('2').toString(), Project.create({title: 'Mon titre 2!'}, ProjectID.create('2')))
  }

  getAllProjects(): Promise<Project[] | null> {
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


  saveProject (project: Project): void {
    this.projects.set(project.projectID.toString(), project)
  }
  
}
