import { Media } from '../domain/Media';

export interface MediaRepo {
  saveMedia(media: Media, filename: string): Promise<Media>;
}
