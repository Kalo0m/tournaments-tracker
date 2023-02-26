import type { APIRoute } from 'astro';
import { PrismaClient } from 'database';

const prisma = new PrismaClient();

export const post: APIRoute = async ({ request }: any) => {
  prisma.user.create({
    data: {
      email: request.body,
    },
  });
  return {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ message: request.body }),
  };
};
