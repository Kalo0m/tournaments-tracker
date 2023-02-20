import Fastify from 'fastify';
import { findTournaments } from '@tenup-finder/find-tournaments';
// CommonJs
const fastify = require('fastify')({
  logger: true,
});

fastify.get('/', async (request, reply) => {
  return findTournaments();
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
