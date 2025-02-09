import { FastifyInstance } from 'fastify';
import { helloController } from '../controllers/hello.controller';

export default async function helloRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/hello', helloController);
}
