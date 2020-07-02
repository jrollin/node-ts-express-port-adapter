import { ProjectID } from '../domain/ProjectID'
import { ProjectCoverProps } from '../domain/ProjectCoverProps'
import { Media } from '../domain/Media'

export interface AddCoverToProjectUseCase {
  addCoverToProject(command: AddCoverToProjectCommand): Promise<void>
}

export class AddCoverToProjectCommand {
  readonly projectID: ProjectID
  readonly file: Media
  readonly title: string

  constructor(projectId: string, file: Media, title: string) {
    this.projectID = ProjectID.create(projectId)
    this.file = file
    this.title = title
  }

  getProjectCoverProps(): ProjectCoverProps {
    return {
      projectID: this.projectID,
      title: this.title,
      cover: this.file,
    }
  }
}
