import { Project } from '../core/domain/Project'
import { ProjectProps } from '../core/domain/ProjectProps'
import { CategoryID } from '../core/domain/CategoryID'
import { ProjectID } from '../core/domain/ProjectID'

export class ProjectFixture {
  static draftProjectWithCategory(): Project {
    const createdAt: Date = new Date('2019-10-01T00:00:01.30Z')
    const props: ProjectProps = {
      title: 'Mon projet',
      description: 'Ma description de projet qui va bien',
      categoryID: CategoryID.create('c1'),
    }
    return Project.create(props, ProjectID.create('project1'))
  }

  static publishedProjectWithCategory(): Project {
    const createdAt: Date = new Date('2019-10-01T00:00:01.30Z')
    const publishedAt: Date = new Date('2019-11-02T00:00:01.30Z')
    const props: ProjectProps = {
      title: 'Mon projet',
      description: 'Ma description de projet qui va bien',
      categoryID: CategoryID.create('c1'),
    }
    const project:Project = Project.create(props, ProjectID.create('project2'))
    project.publish(publishedAt)

    return project
  }
}
