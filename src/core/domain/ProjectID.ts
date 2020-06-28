import { v4 as uuidv4 } from 'uuid'

export class ProjectID {
  private constructor(private id?: string) {
    this.id = id ? id : uuidv4()
  }

  public static create(id?: string): ProjectID {
    return new ProjectID(id)
  }

  toString() {
    return String(this.id)
  }
}
