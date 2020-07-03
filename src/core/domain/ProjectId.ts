import { v4 as uuidv4 } from 'uuid'

export class ProjectId {
  private constructor(private id?: string) {
    this.id = id ? id : uuidv4()
  }

  public static create(id?: string): ProjectId {
    return new ProjectId(id)
  }

  toString() {
    return String(this.id)
  }
}
