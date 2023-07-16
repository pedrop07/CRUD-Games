import { prisma } from '../../lib/prisma.js';

export async function listGames(_request, response, next) {

	try {
		const games = await prisma.games.findMany();

		return response.status(200).send(games);
	} catch (err) {
		next(err);
	}
}
