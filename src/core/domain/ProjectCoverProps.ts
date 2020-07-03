import { ProjectId } from './ProjectId';
import { Media } from './Media';

export interface ProjectCoverProps {
  projectId: ProjectId;
  title: string;
  cover: Media;
}
