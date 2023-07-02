import mongoose from 'mongoose';

import config from '../config';

const getCommonConnectLink = () => `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
const getClusterConnectLink = () => `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}?retryWrites=true&w=majority`;

const init = () => {
  mongoose.set('strictQuery', false);

  return mongoose.connect(
    getCommonConnectLink(),
    config.mongodb.options,
  );
};

export default init;
