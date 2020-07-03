import express, {Application, Request, Response} from 'express'
import {MEDIA_TARGET} from '../../../uploadConfig'

export const configureDefaultRoutes = (app: Application) => {
  const router = express.Router()

  // serve uploaded files
  app.use('/medias', express.static(MEDIA_TARGET))

  // homepage
  router.get('/', (req: Request, res: Response) => {
    if (req.query.name) {
      return res.status(200).send('Hello ' + req.query.name + '!')
    }
    res.status(200).send('Hello Anonymous !')
  })

  app.use(router)
}
