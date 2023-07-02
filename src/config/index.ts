export default {
  app: {
    host: 'localhost',
    url: process.env.APP_URL,
    environment: process.env.NODE_ENV,
    port: Number(process.env.APP_PORT),
  },

  mongodb: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    options: {
      connectTimeoutMS: 30000,
    },
  },
};
