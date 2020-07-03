import {ProjectCoverDto} from './ProjectCoverDto'

export interface ProjectDto {
  id: string
  title: string
  description: string
  category_id?: string
  createdAt: Date
  updatedAt?: Date
  publishedAt?: Date
  covers?: ProjectCoverDto[]
}
