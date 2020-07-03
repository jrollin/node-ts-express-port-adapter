import {Application, NextFunction, Request, Response} from 'express';
import {ValidationError} from '../../../core/domain/ValidationError';
import {ProjectNotFound} from '../../../core/port/ProjectNotFound';

export const configureErrorHandler = (
    app: Application,
) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ValidationError) {
            return res.status(422).json(err.getErrors())
        }
        if (err instanceof ProjectNotFound) {
            return res.status(404).json('Project not found')
        }
        const message: string = 'Something went wrong'
        res.status(500).json(message)
    })

}
