import { ProjectID } from '../domain/ProjectID'
import { ProjectCoverProps } from '../domain/ProjectCoverProps'
import { Media } from '../domain/Media'

export interface AddCoverToProjectUseCase {
  addCoverToProject(command: AddCoverToProjectCommand): Promise<void>
}

export class AddCoverToProjectCommand {
  readonly projectID: ProjectID
  readonly file: Express.Multer.File
  readonly title: string

  constructor(id: string, file: Express.Multer.File, title: string) {
    this.projectID = ProjectID.create(id)
    this.file = file
    this.title = title
  }

  getProjectCover(): ProjectCoverProps {
    const file: Media = {
      name: this.file.filename,
      mimeType: this.file.mimetype,
      path: this.file.path,
      size: this.file.size,
    }
    return {
      projectID: this.projectID,
      title: this.title,
      cover: file,
    }
  }
}
