import { CategoryID } from './CategoryID';

export interface ProjectProps {
  title: string;
  description?: string;
  categoryID: CategoryID;
}
