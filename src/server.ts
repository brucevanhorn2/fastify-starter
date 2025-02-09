import Fastify from 'fastify';
import helloRoutes from './routes/hello.route';
import areYouThereRoutes from './routes/areYouThere.route';


const fastify = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT ?? '3000', 10);
const HOST = process.env.BIND ?? '0.0.0.0';

fastify.register(helloRoutes);
fastify.register(areYouThereRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
