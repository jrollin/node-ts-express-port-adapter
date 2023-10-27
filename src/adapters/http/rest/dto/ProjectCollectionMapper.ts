import { Project } from '@core/domain/Project';
import { ProjectCollectionDto } from './ProjectCollectionDto';
import { ProjectMapper } from './ProjectMapper';

export class ProjectCollectionMapper {
    public static toDTO(projects: Project[]): ProjectCollectionDto {
        return projects.map((project: Project) => {
            return ProjectMapper.toDTO(project);
        });
    }
}
