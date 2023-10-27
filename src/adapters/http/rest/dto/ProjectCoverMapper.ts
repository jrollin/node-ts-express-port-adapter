import { ProjectCoverDto } from './ProjectCoverDto';
import { ProjectCover } from '@core/domain/ProjectCover';

export class ProjectCoverMapper {
    public static toDTO(covers: ProjectCover[]): ProjectCoverDto[] {
        const mediaUrl: string = process.env.MEDIA_URL
            ? process.env.MEDIA_URL
            : '';
        return covers.map((cover: ProjectCover) => {
            const url: string = mediaUrl.concat('/', cover.filename);
            return {
                id: cover.projectCoverId.toString(),
                title: cover.title,
                url,
            };
        });
    }
}
