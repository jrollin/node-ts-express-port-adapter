import express, { Application } from 'express'
import { MEDIA_TARGET } from '../../../uploadConfig'

export const configureDefaultRoutes = (app: Application) => {
  const router = express.Router()

  // serve uploaded files
  app.use('/medias', express.static(MEDIA_TARGET))

  // homepage
  router.get('/', (req: express.Request, res: express.Response) => {
    if (req.query.name) {
      return res.status(200).send('Hello ' + req.query.name + '!')
    }
    res.status(200).send('Hello Anonymous !')
  })

  app.use(router)
}
