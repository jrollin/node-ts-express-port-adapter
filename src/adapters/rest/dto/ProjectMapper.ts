import { ProjectDTO } from './ProjectDTO'
import { Project } from '../../../core/domain/Project'
import { CategoryID } from '../../../core/domain/CategoryID';

export class ProjectMapper {
  public static toDTO(project: Project): ProjectDTO {
    return {
      id: project.projectID.toString(),
      title: project.title,
      description: project.description,
      category_id: project.categoryID.toString(),
      createdAt : project.createdAt,
      updatedAt : project.updatedAt,
      publishedAt : project.updatedAt,
    }
  }
}
