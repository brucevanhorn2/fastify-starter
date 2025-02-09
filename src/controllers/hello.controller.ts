import { FastifyReply, FastifyRequest } from 'fastify';

export const helloController = async (req: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ message: 'Hello, Fastify with TypeScript!' });
};
