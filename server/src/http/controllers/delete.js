import { prisma } from '../../lib/prisma.js';
import { z } from 'zod';

export async function deleteGame(request, response, next) {

	const deleteParamsSchema = z.object({
		id: z.string().uuid()
	});

	try {
		const { id } = deleteParamsSchema.parse(request.params);

		const game = await prisma.games.findUnique({
			where: {
				id,
			},
		});

		if (!game) {
			return response.status(404).send({ message: 'O jogo não foi encontrado' });
		}

		await prisma.games.delete({
			where: {
				id,
			}
		});

		return response.status(200).send();
	} catch (err) {
		next(err);
	}
}
