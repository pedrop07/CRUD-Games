import { prisma } from '../../lib/prisma.js';
import { z } from 'zod';

export async function edit(request, response, next) {

	const editParamsSchema = z.object({
		id: z.string().uuid()
	});

	const editBodySchema = z.object({
		name: z.string().min(3),
		cost: z.number().min(1),
		category: z.string().min(3)
	});

	try {
		const { id } = editParamsSchema.parse(request.params);
		const { name, cost, category } = editBodySchema.parse(request.body);

		const game = await prisma.games.findUnique({
			where: {
				id,
			},
		});

		if (!game) {
			return response.status(404).send({ message: 'O jogo não foi encontrado' });
		}

		await prisma.games.update({
			where: {
				id,
			},
			data: {
				name,
				cost,
				category
			},
		});

		return response.status(200).send();
	} catch (err) {
		next(err);
	}
}
