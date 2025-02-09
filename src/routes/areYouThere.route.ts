import { FastifyInstance } from 'fastify';
import { areYouThereController } from '../controllers/areYouThereController';

export default async function areYouThereRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/are-you-there', areYouThereController);
}