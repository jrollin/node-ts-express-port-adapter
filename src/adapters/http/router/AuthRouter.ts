import express, {Application, Request, Response} from 'express'
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import {LoggerGateway} from '../../../core/port/LoggerGateway';

export const configureAuthRouter = (
    app: Application,
    logger: LoggerGateway
) => {
    const router = express.Router()

    router.get('/login', (req: Request, res: Response) => {

        // verifier
        const generateRandomString = (length: number): string => {
            let text: string = '';
            const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
            for (let i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        const generateCodeChallenge = (verify: string): string => {
            return base64URL(sha256(verify))
        }

        const base64URL = (str: any) : string => {
            return Base64.stringify(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
        }

        // codes
        const verifier: string = generateRandomString(128).toString()
        const challenge: string = generateCodeChallenge(verifier);
        return res.send({verifier, challenge})
    })

    app.use('/auth', router)
}
