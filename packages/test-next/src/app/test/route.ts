import { PrismaClient } from 'database';

export async function POST(request: Request) {
  const db = new PrismaClient();
  console.log(request.body);
  await db.user.create({
    data: {
      email:
        (await request.body
          ?.getReader()
          .read()
          .then((value) => new TextDecoder().decode(value.value) as string)) ??
        '',
    },
  });
  console.log(await db.user.findMany());
  return new Response('Hello world!', { status: 200 });
}
export const config = {
  api: {
    bodyParser: false,
  },
};
