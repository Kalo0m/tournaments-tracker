import { fetchTournaments } from './fetchTournaments';
import type { z } from 'zod';
import type { schema } from './types';
type Tournaments = z.infer<typeof schema>;

export async function findTournaments() {
  // const data = await fetchTournaments();
  // console.log(data);
  // // schema.parse(data);
  // return data[3] as Tournaments;
  return [] as Tournaments;
}
