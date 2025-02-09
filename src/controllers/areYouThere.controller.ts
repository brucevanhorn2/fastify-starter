import { FastifyReply, FastifyRequest } from 'fastify';
const packageDotJSONContents = require("../../package.json");

export const areYouThereController = async (req: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ 
    message: `Yes, I'm here.`,
    app: packageDotJSONContents.name,
    version: packageDotJSONContents.version
 });
};
