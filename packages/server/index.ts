import Fastify from 'fastify';
import { findTournaments } from 'find-tournaments';
// CommonJs
const fastify = Fastify({
  logger: true,
});

fastify.get('/', async () => {
  return findTournaments();
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    console.log('Starting server...');
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
