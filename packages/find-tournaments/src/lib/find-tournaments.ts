import { fetchTournaments } from './fetchTournaments';
import type { z } from 'zod';
import type { schema } from './types';
type Tournaments = z.infer<typeof schema>;

export async function findTournaments() {
  console.log('je suis pas encore sur npm frerot');
  const data = (await fetchTournaments())[3] as Tournaments;
  console.log(data);
  // schema.parse(data);
  return data;
}
