import { MediaRepo } from '../../core/port/MediaRepo';
import { Media } from '../../core/domain/Media';

export class InMemoryMediaRepo implements MediaRepo {
  private medias: Media[] = [];

  saveMedia(media: Media, filename: string): Promise<Media> {
    this.medias.push(media);
    return Promise.resolve(media);
  }

  getMedias(): Media[] {
    return this.medias;
  }
}
