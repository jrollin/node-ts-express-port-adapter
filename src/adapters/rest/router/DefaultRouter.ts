import express, { Application } from 'express'

export const configureDefaultRoutes = (app: Application) => {
  const router = express.Router()

  router.get('/', (req: express.Request, res: express.Response) => {
    if( req.query.name){
      return res.status(200).send('Hello ' + req.query.name + '!')
    }
    res.status(200).send('Hello Anonymous !')
  })

  app.use(router)
}
