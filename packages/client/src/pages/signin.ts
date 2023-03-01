import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const get: APIRoute = async ({ request, url }) => {
  const email = url.searchParams.get('email');
  if (!email) {
    return {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ message: 'email is required' }),
    };
  }
  await prisma.user.create({
    data: {
      email,
    },
  });
  return {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email }),
  };
};
