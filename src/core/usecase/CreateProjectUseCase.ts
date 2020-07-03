import { ProjectProps } from '../domain/ProjectProps'
import { CategoryId } from '../domain/CategoryId'

export interface CreateProjectUseCase {
  createProject(command: CreateProjectCommand): Promise<void>
}

export class CreateProjectCommand {
  title: string

  description: string

  categoryId: CategoryId

  constructor(title: string, description: string, categoryId: string) {
    this.title = title
    this.description = description
    this.categoryId = CategoryId.create(categoryId)
  }

  getProjecProps(): ProjectProps {
    return {
      title: this.title,
      description: this.description,
      categoryId: this.categoryId,
    }
  }
}
