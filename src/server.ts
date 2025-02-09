import Fastify from 'fastify';
import helloRoutes from './routes/hello.route';

const fastify = Fastify({ logger: true });

// Register Routes
fastify.register(helloRoutes);

// Start Server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`🚀 Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
