import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

export const generateRandomString = (length: number): string => {
    let text: string = '';
    const possible: string =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const generateCodeChallenge = (verify: string): string => {
    return base64URL(sha256(verify));
};

export const base64URL = (str: any): string => {
    return Base64.stringify(str)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

export const urlEncodeParams = (params: { [key: string]: string }): string => {
    return Object.keys(params)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
};
