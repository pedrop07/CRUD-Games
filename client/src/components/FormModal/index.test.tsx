import { act, fireEvent, render } from '@testing-library/react';
import { FormModal } from './index'
import api from '../../services/api';

const mockFormModalProps = {
  id: '123',
  name: 'Batman',
  cost: 100,
  category: 'Action',
  listGames:
    [
      {
        id: '123',
        name: 'Batman',
        cost: 100,
        category: 'Action'
      }
    ],
  setListGames: jest.fn(),
  open: true,
  setOpen: jest.fn()
}

describe.skip('Components/FormModal', () => {
  it('should render correctly', () => {
    const {
      getByLabelText,
      getByRole,
      getByTestId,
      getByText,
      getByDisplayValue
    } = render(
      <FormModal
        {...mockFormModalProps}
      />
    );

    expect(getByTestId('form-teste-id')).toBeInTheDocument();
    expect(getByLabelText('Nome')).toBeInTheDocument();
    expect(getByLabelText('Preço')).toBeInTheDocument();
    expect(getByLabelText('Categoria')).toBeInTheDocument();

    expect(getByDisplayValue('Batman')).toBeInTheDocument();
    expect(getByDisplayValue('100')).toBeInTheDocument();
    expect(getByDisplayValue('Action')).toBeInTheDocument();

    expect(getByRole('button', { name: 'Editar' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Deletar' })).toBeInTheDocument();

    expect(getByText('Editar o Jogo:')).toBeInTheDocument();
    expect(getByText('Batman')).toBeInTheDocument();
  });

  describe('on delete', () => {
    it('should delete game', async () => {
      const mockDeleteFunction = jest.spyOn(api, 'delete')

      const { getByRole } = render(
        <FormModal
          {...mockFormModalProps}
        />
      );

      const deleteButton = getByRole('button', { name: 'Deletar' });

      await act(() => {
        fireEvent.click(deleteButton);
      });

      expect(mockDeleteFunction).toHaveBeenCalled();
    });
  });
});