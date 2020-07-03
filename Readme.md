# Express with typescript

Status : WIP / draft

[![CircleCI](https://circleci.com/gh/jrollin/node-ts-express-port-adapter.svg?style=svg)](https://circleci.com/gh/jrollin/node-ts-express-port-adapter)

Manage a project portfolio with ddd and port/adapter pattern


## Stack

Node + Typescript  + Express

### Dependencies 

packages global or local

* typescript
* ts-node

Packages :

* [express](https://www.npmjs.com/package/express) : framework
* [dotenv](https://www.npmjs.com/package/dotenv): env config loader
* [body-parser](https://www.npmjs.com/package/body-parser) : parse body middleware
* [cors](https://www.npmjs.com/package/cors) 
* [helmet](https://www.npmjs.com/package/helmet) : security middleware 
* [morgan](https://www.npmjs.com/package/morgan) : logger middleware  

Conventions

* tslint
* prettier

Validation

* [validatorjs](https://www.npmjs.com/package/validatorjs)


File Upload 

* [multer](https://www.npmjs.com/package/multer) : file middleware
  
Log

* [pino](https://getpino.io/#/)

Testing

* [jest](https://jestjs.io/)

Image:

* [Jimp](https://github.com/oliver-moran/jimp)

Auth :

* [basic auth](https://github.com/LionC/express-basic-auth) : express middleware
* [jwt auth](https://github.com/auth0/express-jwt) : express middleware

## Architecture design

* DDD
* Port/Adapter 
* command / query 


### Design details for DDD

TODO : mappers

* From Domain to DTO
* From Domain to Persistence : @TODO
* From Persistence to Domain : @TODO


### Keycloak

Launch keycloak server :  http://locahost:8080

```bash
docker-compose up
```


#### Config

 * realm : create realm with openid connect
 * client > settings : ensure standard flow and direct grant selected
 * roles > create role 'user'
 * client scope:  create scope 'skills' (disable consent)
 * client > scopes :  add 'skills' to default scope selected

Do not use Implicit Flow (deprecated) but Authorization Code Grant Flow with PKCE

[Video about PKCE flow](https://www.youtube.com/watch?v=CHzERullHe8)


JSON Web Keys(JWKs) returned by authorization server endpoint

```bash
http://localhost:8080/auth/realms/myrealm/protocol/openid-connect/certs
```


#### Example 1 : Direct Access Grants (if Enabled)

Possible to retrieve token with username/password

```bash
$export TOKEN=$(curl -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=express-portfolio" \
  -d "username=myuser" \
  -d "password=mypass" \
  -d "grant_type=password" \
  -X POST http://localhost:8080/auth/realms/myrealm/protocol/openid-connect/token | jq -r .access_token)
$echo $TOKEN
```

#### Example 2 : Authorization Code Grant Flow with PKCE

ref : https://auth0.com/docs/api-auth/tutorials/authorization-code-grant-pkce

* create code verifier
* create code challenge from verifier
* Get the User's Authorization with code challenge
* Exchange the Authorization Code for an Access Token
* Call the API  with Bearer :)
* verify token  (JWT, claims, perms)
