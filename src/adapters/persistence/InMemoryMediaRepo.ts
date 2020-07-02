import * as fs from 'fs'
import * as path from 'path'
import { MediaRepo } from '../../core/port/MediaRepo'
import { Media } from '../../core/domain/Media'
import { LoggerGateway } from '../../core/port/LoggerGateway'

export class InMemoryMediaRepo implements MediaRepo {
  
  private medias: Media[] = []
  
  constructor(private logger: LoggerGateway) {}

  saveMedia(media: Media, filename: string): Promise<Media> {
    this.medias.push(media)
    return Promise.resolve(media)
  }

  getMedias(): Media[] {
    return this.medias
  }
}
