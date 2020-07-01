import { v4 as uuidv4 } from 'uuid'

export class ProjectCoverID {
  private constructor(private id?: string) {
    this.id = id ? id : uuidv4()
  }

  public static create(id?: string): ProjectCoverID {
    return new ProjectCoverID(id)
  }

  toString() {
    return String(this.id)
  }
}
