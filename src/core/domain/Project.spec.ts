import { ValidationError } from './ValidationError';
import { CategoryId } from './CategoryId';
import { Project } from './Project';
import { ProjectProps } from './ProjectProps';

describe('Project', () => {

  describe.each([[{ title: '' }], [{ title: 'te' }]])('cannot create project with invalid data', (data) => {
    test(`with data ${JSON.stringify(data)}`, () => {
      expect(() => {
         Project.create(data as ProjectProps)
      }).toThrowError(ValidationError)
    })
  })

  it('can publish project', async () => {

    const project:Project = Project.create({ title: 'test', description: 'my descr', categoryId: 'cat1' } as ProjectProps)
    const publishedAt: Date = new Date('2019-11-02T00:00:01.30Z')
    project.publish(publishedAt)

    expect(project.publishedAt).toEqual(publishedAt)
    expect(project.updatedAt).toBeDefined()
})

  it('can create project with minimal props', async () => {

    const project:Project = Project.create({ title: 'test' } as ProjectProps)

    expect(project.title).toEqual('test')
    expect(project.createdAt).toBeDefined()
    expect(project.projectId).toBeDefined()

})
  it('can create project with all props', async () => {

      const project:Project = Project.create({ title: 'test', description: 'my descr', categoryId: 'cat1' } as ProjectProps)

      expect(project.title).toEqual('test')
      expect(project.description).toEqual('my descr')
      expect(project.categoryId).toEqual(CategoryId.create('cat1').toString())
      expect(project.createdAt).toBeDefined()
      expect(project.projectId).toBeDefined()
  })
})
