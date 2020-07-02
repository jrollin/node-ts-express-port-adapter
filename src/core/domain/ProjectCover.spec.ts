import { ValidationError } from './ValidationError'
import { CategoryID } from './CategoryID'
import { ProjectCover } from './ProjectCover'
import { ProjectCoverProps } from './ProjectCoverProps'
import { Media } from './Media';

describe('ProjectCover', () => {
  describe.each([[{ title: '' }], [{ title: 'te' }]])('cannot create project cover with invalid data', (data) => {
    test(`with data ${JSON.stringify(data)}`, () => {
      expect(() => {
        ProjectCover.create(data as ProjectCoverProps)
      }).toThrowError(ValidationError)
    })
  })
  it('can create project cover with all props', async () => {
    const media: Media  = {
      name: 'fake',
      mimeType: 'fake',
      path: 'fakepath',
      size: 23,
    }
    const cover: ProjectCover = ProjectCover.create({ title: 'test', projectID: 'pro1', cover: media } as ProjectCoverProps)

    expect(cover.title).toEqual('test')
  })
})
