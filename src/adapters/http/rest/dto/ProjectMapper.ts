import {ProjectDto} from './ProjectDto'
import {Project} from '../../../../core/domain/Project'
import {ProjectCoverMapper} from './ProjectCoverMapper';

export class ProjectMapper {
  public static toDTO(project: Project): ProjectDto {
    
    return {
      id: project.projectId.toString(),
      title: project.title,
      description: project.description,
      category_id: project.categoryId.toString(),
      createdAt : project.createdAt,
      updatedAt : project.updatedAt,
      publishedAt : project.updatedAt,
      covers: ProjectCoverMapper.toDTO(project.getCovers())
    }
  }
}
