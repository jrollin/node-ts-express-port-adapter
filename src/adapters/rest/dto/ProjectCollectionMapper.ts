import { Project } from '../../../core/domain/Project'
import { ProjectCollectionDTO } from './ProjectCollectionDTO'

export class ProjectCollectionMapper {
  public static toDTO(projects: Project[]): ProjectCollectionDTO {
    return projects.map((project: Project) => {
      return {
        id: project.projectID.toString(),
        title: project.title,
      }
    })
  }
}
