import {ProjectCoverDto} from './ProjectCoverDto';
import {ProjectCover} from '../../../../core/domain/ProjectCover';
import {MEDIA_URL} from '../../../../uploadConfig';

export class ProjectCoverMapper {
  public static toDTO(covers: ProjectCover[]): ProjectCoverDto[] {

    return covers.map((cover: ProjectCover) => {
      const url: string = MEDIA_URL.concat('/', cover.filename)
      return {
        id: cover.projectCoverId.toString(),
        title: cover.title,
        url
      }
    })
  }
}
