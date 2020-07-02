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
