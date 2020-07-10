import express, {Application, Request, Response} from 'express'
import cookieParser from 'cookie-parser';
import axios from 'axios'
import {LoggerGateway} from '../../../core/port/LoggerGateway';
import {generateCodeChallenge, generateRandomString, urlEncodeParams} from '../../../utils/Authentication';

export const configureAuthRouter = (
    app: Application,
    logger: LoggerGateway,
    openIdClientId: string,
    openIdRedirectUrl: string,
    openIdAuthUrl: string,
    openIdTokenUrl: string
) => {
    const router = express.Router()

    // part 1  : get auth code with unique state
    router.get('/login', (req: Request, res: Response) => {

        // generate verifier and challenge codes
        const verifier: string = generateRandomString(128).toString()
        const challenge: string = generateCodeChallenge(verifier);
        const state: string = generateRandomString(128).toString()

        // store verifier with state in short live cookie (5min)
        const cookieData = JSON.stringify({state, verifier})
        res.cookie('authstate', cookieData, {maxAge: 5 * 60 * 1000, httpOnly: true, secure: true});

        const params: { [key: string]: string } = {
            response_type: 'code',
            response_mode: 'query',
            client_id: openIdClientId,
            scope: 'openid',
            redirect_uri: openIdRedirectUrl,
            state,
            code_challenge: challenge,
            code_challenge_method: 'S256'
        };
        const getAuthCode = openIdAuthUrl.concat('?', urlEncodeParams(params));

        // @todo: display link or redirect ?

        return res.send({
            loginUrl: getAuthCode,
        })
    })

    // part 2:: exchange code with access token
    router.get('/login/callback', cookieParser(), async (req: Request, res: Response) => {

        if (!req.query.code) {
            logger.error('Authorization code is invalid')
            return res.status(401).json('Authorization request is invalid')
        }
        if (!req.query.state) {
            logger.error('Authorization state is invalid')
            return res.status(401).json('Authorization request is invalid')
        }

        // load auth session infos
        const cookies = req.cookies
        if (!cookies.authstate) {
            logger.error('No session found')
            return res.status(401).json('Authorization request is invalid')
        }

        const cookieData = JSON.parse(cookies.authstate)
        if (req.query.state !== cookieData.state) {
            logger.error('Authorization state mismatch state in session')
            return res.status(401).json('Authorization request is invalid')
        }

        try {
            const codeVerifier = cookieData.verifier
            const code: string = req.query.code as string

            // params for retrieving access token
            const data: { [key: string]: string } = {
                grant_type: 'authorization_code',
                client_id: openIdClientId,
                code,
                redirect_uri: openIdRedirectUrl,
                code_verifier: codeVerifier,
            };
            // retrieve access token
            const respBody = await axios({
                method: 'post',
                url: openIdTokenUrl,
                data: urlEncodeParams(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            return res.json({infos: respBody.data})
        } catch (err) {
            logger.error('Error retrieving access token')
            return res.status(400).json(err)
        }
    })
    app.use('/auth', router)
}
