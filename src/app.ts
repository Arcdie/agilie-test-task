import 'reflect-metadata';

import log from './libs/winston.lib';

import { setEnvironment } from './config/environment.config';

setEnvironment();

import {
  bootstrap,
  getAddress,
} from './services/app.service';

bootstrap()
  .then(() => {
    log.info(`App is running at ${getAddress()}`);
    log.info('Connection to db is successful');
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});
