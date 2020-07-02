import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs'
import * as path from 'path'
import { MediaRepo } from '../../core/port/MediaRepo'
import { Media } from '../../core/domain/Media'
import { LoggerGateway } from '../../core/port/LoggerGateway'

export class FilesystemMediaRepo implements MediaRepo {
  constructor(private destination: string, private logger: LoggerGateway) {}

  saveMedia(media: Media, filename: string): Promise<Media> {
    try {
      const newPath = path.join(this.destination, filename)
      fs.renameSync(media.path, newPath)
    } catch (err) {
      this.logger.error(err)
      throw err
    }
    return Promise.resolve(media)
  }
}
