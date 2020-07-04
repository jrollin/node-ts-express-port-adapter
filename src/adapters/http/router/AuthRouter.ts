import express, {Application, Request, Response} from 'express'
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import {LoggerGateway} from '../../../core/port/LoggerGateway';
import cookieParser from 'cookie-parser';
import axios from 'axios'

export const configureAuthRouter = (
    app: Application,
    logger: LoggerGateway
) => {
    const router = express.Router()

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

    const base64URL = (str: any): string => {
        return Base64.stringify(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    }

    // keycloak infos
    const clientId = 'express-portfolio'
    const realm = 'myrealm'
    const redirectUri = 'https://localhost:3000/auth/login/callback'

    // part 1  : get auth code with unique state
    router.get('/login', (req: Request, res: Response) => {

        // codes
        // @TODO store with state ?
        const verifier: string = generateRandomString(128).toString()
        const challenge: string = generateCodeChallenge(verifier);
        const state: string = generateRandomString(128).toString()

        // store verifier with state
        const cookieData = JSON.stringify({state: state, verifier: verifier})
        res.cookie('myexpressapp', cookieData, {maxAge: 900000, httpOnly: true, secure: true});

        const params: { [key: string]: string } = {
            response_type: 'code',
            // response_mode: 'fragment',
            response_mode: 'query',
            client_id: clientId,
            scope: 'openid',
            redirect_uri: redirectUri,
            state,
            code_challenge: challenge,
            code_challenge_method: 'S256'
        };

        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');

        // part 1:  get auth code
        const getAuthCode = ''.concat('http://localhost:8080', '/auth/realms/', realm, '/protocol/openid-connect/auth', '?', query);

        return res.json({
            verifier,
            challenge,
            state,
            get_code: getAuthCode,
        })
    })

    // part 2:: exchange code with access token
    router.get('/login/callback', cookieParser(), async (req: Request, res: Response) => {

        if (!req.query.code) {
            return res.status(401).json('invalid code received')
        }
        if (!req.query.state) {
            return res.status(401).json('invalid state received')
        }

        const cookies = req.cookies
        if (!cookies.myexpressapp) {
            return res.status(401).json('invalid state')
        }

        const cookieData = JSON.parse(cookies.myexpressapp)

        if (req.query.state !== cookieData.state) {
            return res.status(401).json('invalid state received')
        }

        const codeVerifier = cookieData.verifier
        const code: string = req.query.code as string
        const data: { [key: string]: string } = {
            grant_type: 'authorization_code',
            client_id: clientId,
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        };

        const dataPayload = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
            .join('&');

        // get auth code
        const postToken = ''.concat('http://localhost:8080', '/auth/realms/', realm, '/protocol/openid-connect/token')

        try {
            // post
            const respBody = await axios({
                method: 'post',
                url: postToken,
                data: dataPayload,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            return res.json({infos: respBody.data})
        } catch (err) {
            return res.status(500).json(err)
        }
    })
    app.use('/auth', router)
}
