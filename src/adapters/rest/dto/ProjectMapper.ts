import { ProjectDTO } from './ProjectDTO'
import { Project } from '../../../core/domain/Project'

export class ProjectMapper {
  public static toDTO(project: Project): ProjectDTO {
    return {
      id: project.projectID.toString(),
      title: project.title,
    }
  }
}
