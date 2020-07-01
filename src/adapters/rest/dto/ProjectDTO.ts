export interface ProjectDTO {
  id: string
  title: string
  description: string
  category_id?: string
  createdAt: Date
  updatedAt?: Date
  publishedAt?: Date
}
