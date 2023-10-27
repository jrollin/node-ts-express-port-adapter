import { CategoryId } from './CategoryId';

export interface ProjectProps {
    title: string;
    description?: string;
    categoryId: CategoryId;
}
