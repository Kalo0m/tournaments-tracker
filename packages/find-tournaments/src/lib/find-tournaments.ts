import { fetchTournaments } from './fetchTournaments';
import { schema } from './types';
import type { z } from 'zod';
export async function findTournaments() {
  const data = (await fetchTournaments())[3] as z.infer<typeof schema>;
  schema.parse(data);
  return data;
}
