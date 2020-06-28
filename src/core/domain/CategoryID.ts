import { v4 as uuidv4 } from 'uuid'

export class CategoryID {
  private constructor(private id?: string) {
    this.id = id ? id : uuidv4()
  }

  public static create(id?: string): CategoryID {
    return new CategoryID(id)
  }
  toString() {
    return String(this.id)
  }
}
