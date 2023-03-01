import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const post: APIRoute = async ({ request }: any) => {
  console.log(request);
  const body = await request.json();
  console.log(body);
  await prisma.user.create({
    data: {
      email: body.e,
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
