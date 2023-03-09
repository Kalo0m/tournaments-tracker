import type { Prisma } from 'database';
import { PrismaClient } from 'database';
import { findTournaments } from 'find-tournaments';

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, unicorn/prefer-module
const Mailjet = require('node-mailjet');

const db = new PrismaClient();

const mailjet = Mailjet.apiConnect(
  process.env['MJ_APIKEY_PUBLIC'] ?? '',
  process.env['MJ_APIKEY_PRIVATE'] ?? ''
);

function format(inputDate: Date) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, '0');

  month = month.toString().padStart(2, '0');

  return `${date}/${month}/${year}`;
}

export default async function handler(_: any, res: any) {
  const knownTournaments = await db.tournament.findMany({
    select: { id: true },
  });

  const tournaments = (await findTournaments()).results.list.map(
    (tournament) => ({
      id: tournament.tournoi.id,
      name: tournament.tournoi.libelle,
      startDate: new Date(tournament.tournoi.dateDebut.date),
      endDate: new Date(tournament.tournoi.dateFin.date),
      city: tournament.tournoi.nomClub,
    })
  );

  const newTournaments = tournaments.filter(
    (tournament) =>
      !knownTournaments.some((known) => known.id === tournament.id)
  );
  await db.tournament.createMany({
    data: newTournaments,
  });

  const users = await db.user.findMany({ select: { email: true } });
  if (newTournaments.length > 0) {
    console.info('new tournaments');
    await Promise.all(
      users.map((user) => {
        return mailjet.post('send', { version: 'v3.1' }).request({
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
                    `<li>${tournament.name} - ${
                      tournament.city
                    }, dates : ${format(tournament.startDate)} - ${format(
                      tournament.endDate
                    )}</li>`
                )
                .join('')}</ul>`,
            },
          ],
        });
      })
    );

    await db.tournament.createMany({
      data: newTournaments,
    });
  }

  res.status(200).json({ message: 'sent' });
}
