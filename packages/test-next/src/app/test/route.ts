import { PrismaClient } from 'database';

export async function GET(request: Request) {
  const db = new PrismaClient();
  console.log(await db.user.findMany());
  return new Response('Hello world!', { status: 200 });
}
