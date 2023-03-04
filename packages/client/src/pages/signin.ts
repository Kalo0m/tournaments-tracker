import type { APIRoute } from 'astro';
import { PrismaClient } from 'database';

const prisma = new PrismaClient();

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  if (!body.email) {
    return {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ message: body.email }),
    };
  }
  await prisma.user.create({
    data: {
      email: body.email,
    },
  });
  return {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email: body.email }),
  };
};
