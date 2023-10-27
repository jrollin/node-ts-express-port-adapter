import { ProjectId } from '../domain/ProjectId';
import { ProjectCoverProps } from '../domain/ProjectCoverProps';
import { Media } from '../domain/Media';

export interface AddCoverToProjectUseCase {
    addCoverToProject(command: AddCoverToProjectCommand): Promise<void>;
}

export class AddCoverToProjectCommand {
    readonly projectId: ProjectId;
    readonly file: Media;
    readonly title: string;

    constructor(projectId: string, file: Media, title: string) {
        this.projectId = ProjectId.create(projectId);
        this.file = file;
        this.title = title;
    }

    getProjectCoverProps(): ProjectCoverProps {
        return {
            projectId: this.projectId,
            title: this.title,
            cover: this.file,
        };
    }
}
