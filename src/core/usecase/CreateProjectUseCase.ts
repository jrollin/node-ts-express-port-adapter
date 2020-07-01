import { ProjectProps } from '../domain/ProjectProps'
import { CategoryID } from '../domain/CategoryID'

export interface CreateProjectUseCase {
  createProject(command: CreateProjectCommand): Promise<void>
}

export class CreateProjectCommand {
  title: string

  description: string

  categoryID: CategoryID

  constructor(title: string, description: string, categoryID: string) {
    this.title = title
    this.description = description
    this.categoryID = CategoryID.create(categoryID)
  }

  getProjecProps(): ProjectProps {
    return {
      title: this.title,
      description: this.description,
      categoryID: this.categoryID,
    }
  }
}
