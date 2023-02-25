import { findTournaments } from 'find-tournaments';
import { PrismaClient, Prisma } from 'database';
const Mailjet = require('node-mailjet'); //Yes, I used require in typescript like this
const db = new PrismaClient();

const mailjet = Mailjet.apiConnect(
  process.env['MJ_APIKEY_PUBLIC'],
  process.env['MJ_APIKEY_PRIVATE']
);

export default async function handler(_: any, res: any) {
  console.log('cron');
  const knownTournaments = await db.tournament.findMany({
    select: { id: true },
  });

  const tournaments: Prisma.TournamentCreateInput[] = (
    await findTournaments()
  ).results.list.map((tournament) => ({
    id: tournament.tournoi.id,
    name: tournament.tournoi.libelle,
    startDate: new Date(tournament.tournoi.dateDebut.date),
    endDate: new Date(tournament.tournoi.dateFin.date),
    city: tournament.tournoi.nomClub,
  }));

  console.log(tournaments);

  const newTournaments = tournaments.filter(
    (tournament) =>
      !knownTournaments.find((known) => known.id === tournament.id)
  );

  const users = await db.user.findMany({ select: { email: true } });
  console.log(users);
  for (const user of users) {
    mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'theo.letouze44@gmail.com',
            Name: 'Théo Letouzé',
          },
          To: [
            {
              Email: user.email,
              Name: user.email,
            },
          ],
          Subject: 'Nouveau tournoi disponible !',
          TextPart:
            'Bonjour, un ou plusieurs tournois sont disponibles sur Tenup',
          HTMLPart: `<h3>Voici la liste des nouveaux tournois :</h3><ul>${newTournaments
            .map(
              (tournament) =>
                `<li>${tournament.name} - ${tournament.city}, dates : ${
                  tournament.startDate.toString().split(' ')[0]
                } - ${tournament.endDate.toString().split(' ')[0]}</li>`
            )
            .join('')}</ul>}`,
        },
      ],
    });
  }

  await db.tournament.createMany({
    data: newTournaments,
  });

  res.status(200).json({ message: 'ok' });
}
