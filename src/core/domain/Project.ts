import { CategoryID } from './CategoryID'
import { ProjectID } from './ProjectID'

export interface Project {
  projectID: ProjectID
  title: string
  description?: string
  publishedAt?: Date
  createdAt?: Date
  updatedAt?: Date
  categoryId?: CategoryID
}
