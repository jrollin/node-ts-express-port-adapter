import { ProjectCoverID } from './ProjectCoverID';
import { ProjectCoverProps } from './ProjectCoverProps';
import Validator from 'validatorjs'
import { ProjectCoverPropsValidation } from './ProjectCoverPropsValidation';
import { ValidationError } from './ValidationError';
import { ProjectID } from './ProjectID';

export class ProjectCover {

  private readonly id: ProjectCoverID
  private props: ProjectCoverProps

  private constructor(props: ProjectCoverProps, id?: ProjectCoverID) {
    this.validate(props)
    this.id = id ? id : ProjectCoverID.create()
    this.props = props
  }

  static create(props: ProjectCoverProps, id?: ProjectCoverID): ProjectCover {
    return new ProjectCover(props, id)
  }

  private validate(props: any): void {
    const validation = new Validator(props, ProjectCoverPropsValidation)
    if (validation.fails()) {
      throw new ValidationError(validation.errors)
    }
  }

  get projectCoverId(): ProjectCoverID {
    return this.id
  }

  get projectId(): ProjectID{
    return this.props.projectID
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
