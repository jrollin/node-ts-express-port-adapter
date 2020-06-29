import { ProjectID } from './ProjectID'
import { ProjectProps } from './ProjectProps'
import Validator from 'validatorjs';
import { ValidationError } from './ValidationError';

export class Project {
  public readonly _id: ProjectID
  public readonly props: ProjectProps

  validationRules: any = {
    title: 'required|min:3',
  };

  private constructor(props: ProjectProps, id?: ProjectID) {
    this.validate(props)
    this._id = id ? id : ProjectID.create(id)
    this.props = props
  }

  static create(props: ProjectProps, id?: ProjectID) {
    return new Project(props, id)
  }
  get projectID(): ProjectID {
    return this._id
  }

  get title(): string {
    return this.props.title
  }

  private validate(props: any): void {
    const validation = new Validator(props, this.validationRules);
    if(validation.fails()){
      throw new ValidationError(validation.errors)
    }
  }
}
