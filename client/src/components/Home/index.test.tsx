import { render, waitFor } from '@testing-library/react';
import { Home } from '.';
import api from '../../services/api';

describe.skip('Components/Home', () => {
	describe("when have data", () => {
		it('should render correctly', async () => {
			jest.spyOn(api, 'get').mockResolvedValueOnce({
				data: [
					{
						id: '21312',
						name: 'Spider',
						cost: 200,
						category: 'Action'
					}
				]
			});

			const {
				container,
				getByText,
				getByTestId,
				getByLabelText,
				getByRole
			} = render(
				<Home />
			);

			expect(getByText('Cadastro de Jogos')).toBeInTheDocument();
			expect(getByTestId('form-teste-id')).toBeInTheDocument();
			expect(getByLabelText('Nome')).toBeInTheDocument();
			expect(getByLabelText('Preço')).toBeInTheDocument();
			expect(getByLabelText('Categoria')).toBeInTheDocument();
			expect(getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();

			await waitFor(() => {
				const cardElement = container.querySelector('.card--container');
				expect(cardElement).toBeInTheDocument();
				expect(cardElement?.textContent?.includes('Spider')).toBe(true);
				expect(cardElement?.textContent?.includes('200')).toBe(true);
				expect(cardElement?.textContent?.includes('Action')).toBe(true);
			});
		});
	})

	describe("when there isn't data", () => {
		it('should render correctly', async () => {
			jest.spyOn(api, 'get').mockResolvedValueOnce({
				data: []
			});

			const { container, getByText } = render(
				<Home />
			);

			expect(getByText('Cadastro de Jogos')).toBeInTheDocument();

			await waitFor(() => {
				const noDataTitle = container.querySelector('h4');
				expect(noDataTitle).toBeInTheDocument();
				expect(noDataTitle?.textContent?.includes('Nenhum Jogo foi encontrado...')).toBe(true);
			});
		});
	})
});
