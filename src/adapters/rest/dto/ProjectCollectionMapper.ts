import { Project } from '../../../core/domain/Project'
import { ProjectCollectionDTO } from './ProjectCollectionDTO'
import { ProjectMapper } from './ProjectMapper';

export class ProjectCollectionMapper {
  public static toDTO(projects: Project[]): ProjectCollectionDTO {
    return projects.map((project: Project) => {
      return ProjectMapper.toDTO(project)
    })
  }
}
