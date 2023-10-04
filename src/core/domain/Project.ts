import { ProjectId } from './ProjectId';
import { ProjectProps } from './ProjectProps';
import Validator from 'validatorjs';
import { ValidationError } from './ValidationError';
import { ProjectPropsValidation } from './ProjectPropsValidation';
import { CategoryId } from './CategoryId';
import { ProjectCover } from './ProjectCover';

export class Project {
  private readonly id: ProjectId;
  private props: ProjectProps;
  public readonly createdAt: Date;
  public updatedAt?: Date;
  public publishedAt?: Date;
  private covers: ProjectCover[] = [];

  private constructor(props: ProjectProps, id?: ProjectId) {
    Project.validate(props);
    this.id = id ? id : ProjectId.create();
    this.props = props;
    this.createdAt = new Date();
  }

  static create(props: ProjectProps, id?: ProjectId): Project {
    return new Project(props, id);
  }

  get projectId(): ProjectId {
    return this.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description ? this.props.description : '';
  }

  get categoryId(): CategoryId {
    return this.props.categoryId;
  }

  private static validate(props: any): void {
    const validation = new Validator(props, ProjectPropsValidation);
    if (validation.fails()) {
      throw new ValidationError(validation.errors);
    }
  }

  publish(date: Date) {
    this.publishedAt = date;
    this.updatedAt = new Date();
  }

  setCovers(covers: ProjectCover[]) {
    this.covers = covers;
  }

  addCover(cover: ProjectCover) {
    this.covers.push(cover);
  }

  getCovers(): ProjectCover[] {
    return this.covers;
  }
}
