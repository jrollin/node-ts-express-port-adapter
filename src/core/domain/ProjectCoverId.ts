import { v4 as uuidv4 } from 'uuid';

export class ProjectCoverId {
  private constructor(private id?: string) {
    this.id = id ? id : uuidv4();
  }

  public static create(id?: string): ProjectCoverId {
    return new ProjectCoverId(id);
  }

  toString() {
    return String(this.id);
  }
}
