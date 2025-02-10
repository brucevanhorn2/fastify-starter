declare module 'fastify-sequelize' {
    import { FastifyPluginCallback } from 'fastify';
    import { Sequelize, Options } from 'sequelize';
  
    interface FastifySequelizeOptions extends Options {
      instance?: string;
    }
  
    const fastifySequelize: FastifyPluginCallback<FastifySequelizeOptions>;
    export default fastifySequelize;
  }
  