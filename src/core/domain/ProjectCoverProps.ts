import { ProjectID } from './ProjectID';
import { Media } from './Media';

export interface ProjectCoverProps {
  projectID: ProjectID;
  title: string;
  cover: Media;
}
