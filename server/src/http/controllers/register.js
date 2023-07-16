import { prisma } from '../../lib/prisma.js';
import { z } from 'zod';

export async function register(request, response, next) {
	const registerBodySchema = z.object({
		name: z.string().min(3),
		cost: z.number().min(1),
		category: z.string().min(3)
	});

	try {
		const { name, cost, category } = registerBodySchema.parse(request.body);
    
		const game = await prisma.games.create({
			data: {
				name,
				cost,
				category
			},
		});

		return response.status(201).send(game);
	} catch (err) {
		next(err);
	}
}
