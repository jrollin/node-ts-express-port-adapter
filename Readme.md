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

packages :

* [express](https://www.npmjs.com/package/express) : framework
* [dotenv](https://www.npmjs.com/package/dotenv): env config loader
* [body-parser](https://www.npmjs.com/package/body-parser) : parse body middleware
* [cors](https://www.npmjs.com/package/cors) 
* [helmet](https://www.npmjs.com/package/helmet) : security middleware 
* [morgan](https://www.npmjs.com/package/morgan) : logger middleware  

conventions

* tslint
* prettier

Validation

* [validatorjs](https://www.npmjs.com/package/validatorjs)

Log

* pino

Testing

* jest


## Architecture design

* DDD
* Port/Adapter 
* command / query 


### Design details for DDD

TODO : mappers

* From Domain to DTO
* From Domain to Persistence : @TODO
* From Persistence to Domain : @TODO
