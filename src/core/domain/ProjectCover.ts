import { ProjectCoverId } from './ProjectCoverId';
import { ProjectCoverProps } from './ProjectCoverProps';
import Validator from 'validatorjs'
import { ProjectCoverPropsValidation } from './ProjectCoverPropsValidation';
import { ValidationError } from './ValidationError';
import { ProjectId } from './ProjectId';

export class ProjectCover {

  private readonly id: ProjectCoverId
  private props: ProjectCoverProps

  private constructor(props: ProjectCoverProps, id?: ProjectCoverId) {
    ProjectCover.validate(props)
    this.id = id ? id : ProjectCoverId.create()
    this.props = props
  }

  static create(props: ProjectCoverProps, id?: ProjectCoverId): ProjectCover {
    return new ProjectCover(props, id)
  }

  private static validate(props: any): void {
    const validation = new Validator(props, ProjectCoverPropsValidation)
    if (validation.fails()) {
      throw new ValidationError(validation.errors)
    }
  }

  get projectCoverId(): ProjectCoverId {
    return this.id
  }

  get projectId(): ProjectId{
    return this.props.projectId
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
