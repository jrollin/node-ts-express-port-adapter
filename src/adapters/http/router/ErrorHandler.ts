import {Application, Request, Response} from 'express';
import {ValidationError} from '../../../core/domain/ValidationError';
import {ProjectNotFound} from '../../../core/port/ProjectNotFound';

export const configureErrorHandler = (
    app: Application,
) => {
    app.use((err: any, req: Request, res: Response) => {
        if (err instanceof ValidationError) {
            return res.status(422).send(err.getErrors())
        }
        if (err instanceof ProjectNotFound) {
            return res.status(404).send('Project not found')
        }
        const message: string = 'Something went wrong'
        res.status(500).json(message)
    })

}
