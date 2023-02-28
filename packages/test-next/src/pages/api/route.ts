import { PrismaClient } from 'database';

const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  const posts = await prisma.user.findMany();
  res.json(posts);
}
