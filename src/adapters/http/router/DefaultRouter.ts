import express, {Application, Request, Response} from 'express'

export const configureDefaultRoutes = (app: Application, mediaTarget:string ) => {
  const router = express.Router()

  // serve uploaded files
  app.use('/medias', express.static(mediaTarget))

  // homepage
  router.get('/', (req: Request, res: Response) => {
    if (req.query.name) {
      return res.status(200).send('Hello ' + req.query.name + '!')
    }
    res.status(200).send('Hello Anonymous !')
  })

  app.use(router)
}
