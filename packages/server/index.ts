import Fastify from 'fastify';
import { findTournaments } from 'find-tournaments';
import { PrismaClient } from 'database';
// CommonJs
const db = new PrismaClient();

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async () => {
  return findTournaments();
});

fastify.post<{
  Body: { email: string };
}>('/subscribe', async (req) => {
  console.log(req);

  if (!req.body.email) {
    return {
      error: 'Email is required',
    };
  }
  return db.user.create({
    data: {
      email: req.body.email,
    },
  });
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
