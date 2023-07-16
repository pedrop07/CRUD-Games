import { ZodError } from 'zod';

export function errorHandler(error, _request, response) {
	if (error instanceof ZodError) {
		return response
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() });
	}

	response.status(500).send('error', { error });
}