import { Project } from '../../core/domain/Project'
import { ProjectID } from '../../core/domain/ProjectID'
import { ProjectRepo } from '../../core/port/ProjectRepo'

export class InMemoryProjectRepo implements ProjectRepo {
  projects: Map<string, Project> = new Map()

  constructor() {
    this.projects.set('1', {
      projectID: ProjectID.create('1'),
      title: 'Mon titre',
    })
    this.projects.set('2', {
      projectID: ProjectID.create(),
      title: 'Mon titre Deux !',
    })
  }

  getAllProjects(): Promise<Project[] | null> {
    const projects: Project[] = [...this.projects.values()]
    return Promise.resolve(projects)
  }
}
