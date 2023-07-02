import { Server } from 'http';
import mongoose from 'mongoose';

import initExpress from '../libs/express.lib';
import initMongoConnection from '../libs/mongodb.lib';

let server: Server;
let connection: typeof mongoose;

export const getAddress = () => {
  if (!server) {
    throw new Error('App was not launched');
  }

  const address = server.address();

  if (!address) {
    throw new Error('No address');
  }

  if (typeof address === 'string') {
    return address;
  }

  return `${address.address}:${address.port}`;
}

export const bootstrap = async () => {
  server = await initExpress();
  connection = await initMongoConnection();
};
