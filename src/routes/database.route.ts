import { FastifyInstance } from 'fastify';
import { createUser, getUsers } from '../controllers/database.controller';

export default async function userRoutes(fastify: FastifyInstance) {
  // Create a new user
  fastify.post('/api/v1/users', async (req, reply) => {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    const user = await createUser(name, email, password);
    reply.send(user);
  });

  // Get all users
  fastify.get('/api/v1/users', async (req, reply) => {
    const users = await getUsers();
    reply.send(users);
  });
}
