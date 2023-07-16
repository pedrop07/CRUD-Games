import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Form } from './index'

describe.skip('Components/Form', () => {
	describe('Register Form', () => {
		it('should render correctly', () => {
			const mockSubmitFunction = jest.fn();

			const { getByLabelText, getByRole, getByTestId } = render(
				<Form action={'register'} onSubmit={mockSubmitFunction} />
			);

			expect(getByTestId('form-teste-id')).toBeInTheDocument();
			expect(getByLabelText('Nome')).toBeInTheDocument();
			expect(getByLabelText('Preço')).toBeInTheDocument();
			expect(getByLabelText('Categoria')).toBeInTheDocument();
			expect(getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
		});
	});

	describe('Edit Form', () => {
		it('should render correctly', () => {
			const mockSubmitFunction = jest.fn();
			const mockValues = {
				name: 'Ninja',
				cost: 244,
				category: 'Adventure'
			};

			const { getByLabelText, getByRole, getByTestId, container } = render(
				<Form action={'edit'} onSubmit={mockSubmitFunction} values={mockValues} />
			);

			const nameInput = container.querySelector('input[name="name"]');
			const precoInput = container.querySelector('input[name="cost"]');
			const categoriaInput = container.querySelector('input[name="category"]');

			expect(getByTestId('form-teste-id')).toBeInTheDocument();
			expect(getByLabelText('Nome')).toBeInTheDocument();
			expect(getByLabelText('Preço')).toBeInTheDocument();
			expect(getByLabelText('Categoria')).toBeInTheDocument();
			expect(getByRole('button', { name: 'Editar' })).toBeInTheDocument();
			expect(nameInput).toHaveValue('Ninja');
			expect(precoInput).toHaveValue(244);
			expect(categoriaInput).toHaveValue('Adventure');
		});
	});

	describe('on submit', () => {
		describe('when all inputs are valid', () => {
			it('should call submit callback correctly', async () => {
				const mockSubmitFunction = jest.fn();
	
				const { container, getByRole } = render(<Form action={'register'} onSubmit={mockSubmitFunction} />);
	
				const nameInput = container.querySelector('input[name="name"]') as Element;
				const precoInput = container.querySelector('input[name="cost"]') as Element;
				const categoriaInput = container.querySelector('input[name="category"]') as Element;
				const submitButton = getByRole('button', { name: 'Cadastrar' });
	
				await act(() => {
					fireEvent.change(nameInput, { target: { value: 'Batman' } });
					fireEvent.change(precoInput, { target: { value: 100 } });
					fireEvent.change(categoriaInput, { target: { value: 'Action' } });
	
					fireEvent.click(submitButton);
				});
	
				expect(mockSubmitFunction).toHaveBeenCalledWith({
					name: 'Batman',
					cost: 100,
					category: 'Action'
				});
			});
		});

		describe('when have validation error', () => {
			it('should not call submit callback', async () => {
				const mockSubmitFunction = jest.fn();
	
				const { container, getByRole } = render(
					<Form action={'register'} onSubmit={mockSubmitFunction} />
				);
	
				const nameInput = container.querySelector('input[name="name"]') as Element;
				const precoInput = container.querySelector('input[name="cost"]') as Element;
				const categoriaInput = container.querySelector('input[name="category"]') as Element;
				const submitButton = getByRole('button', { name: 'Cadastrar' });
	
				await act(() => {
					fireEvent.change(nameInput, { target: { value: 'Ba' } });
					fireEvent.change(precoInput, { target: { value: 100 } });
					fireEvent.change(categoriaInput, { target: { value: 'Action' } });
	
					fireEvent.click(submitButton);
				});
	
				expect(mockSubmitFunction).not.toHaveBeenCalled();
			});
		});
	});
});