import { CategoryID } from './CategoryID';

export interface ProjectProps {
  title: string;
  description?: string;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId?: CategoryID;
}
