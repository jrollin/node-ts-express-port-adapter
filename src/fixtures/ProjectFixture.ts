import { Project } from '../core/domain/Project';
import { ProjectProps } from '../core/domain/ProjectProps';
import { CategoryId } from '../core/domain/CategoryId';
import { ProjectId } from '../core/domain/ProjectId';

export class ProjectFixture {
  static draftProjectWithCategory(): Project {
    const props: ProjectProps = {
      title: 'Mon projet',
      description: 'Ma description de projet qui va bien',
      categoryId: CategoryId.create('c1'),
    };
    return Project.create(props, ProjectId.create('project1'));
  }

  static publishedProjectWithCategory(): Project {
    const publishedAt: Date = new Date('2019-11-02T00:00:01.30Z');
    const props: ProjectProps = {
      title: 'Mon projet',
      description: 'Ma description de projet qui va bien',
      categoryId: CategoryId.create('c1'),
    };
    const project: Project = Project.create(
      props,
      ProjectId.create('project2'),
    );
    project.publish(publishedAt);

    return project;
  }
}
