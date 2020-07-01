import { ProjectCoverID } from './ProjectCoverID';
import { ProjectCoverProps } from './ProjectCoverProps';

export class ProjectCover {

  private readonly id: ProjectCoverID
  private props: ProjectCoverProps

  private constructor(props: ProjectCoverProps, id?: ProjectCoverID) {
    this.id = id ? id : ProjectCoverID.create()
    this.props = props
  }

  static create(props: ProjectCoverProps, id?: ProjectCoverID): ProjectCover {
    return new ProjectCover(props, id)
  }

  get projectCoverId(): ProjectCoverID {
    return this.id
  }

  get title(): string {
    return this.props.title
  }

  get name(): string {
    return this.props.cover.name
  }

  get path(): string {
    return this.props.cover.path
  }

  get mimeType(): string {
    return this.props.cover.mimeType
  }

  get filename(): string {
    return ''.concat(this.id.toString(), '.', this.getExtensionFromMimetype(this.mimeType))
  }

  getExtensionFromMimetype(mimeType: string): string {
    switch (mimeType) {
      case 'image/jpg':
      case 'image/jpeg':
        return 'jpg'
      case 'image/png':
        return 'png'
    }
    throw new Error('Unsupported mimetype')
  }
}
