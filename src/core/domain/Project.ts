import { ProjectID } from './ProjectID'
import { ProjectProps } from './ProjectProps'
import Validator from 'validatorjs'
import { ValidationError } from './ValidationError'
import { ProjectPropsValidation } from './ProjectPropsValidation'
import { CategoryID } from './CategoryID'
import { ProjectCover } from './ProjectCover';

export class Project {
  private readonly id: ProjectID
  private props: ProjectProps
  public readonly createdAt: Date
  public updatedAt?: Date
  public publishedAt?: Date
  private covers: ProjectCover[] = []

  private constructor(props: ProjectProps, id?: ProjectID) {
    this.validate(props)
    this.id = id ? id : ProjectID.create()
    this.props = props
    this.createdAt = new Date()
  }

  static create(props: ProjectProps, id?: ProjectID): Project {
    return new Project(props, id)
  }


  get projectID(): ProjectID {
    return this.id
  }

  get title(): string {
    return this.props.title
  }

  get description(): string {
    return this.props.description ? this.props.description : ''
  }

  get categoryID(): CategoryID {
    return this.props.categoryID
  }

  private validate(props: any): void {
    const validation = new Validator(props, ProjectPropsValidation)
    if (validation.fails()) {
      throw new ValidationError(validation.errors)
    }
  }

  publish(date: Date) {
    this.publishedAt = date
    this.updatedAt = new Date()
  }

  setCovers(covers: ProjectCover[]){
    this.covers = covers
  }

  addCover(cover: ProjectCover){
    this.covers.push(cover)
  }

  getCovers():ProjectCover[]{
    return this.covers
  } 
  
}
