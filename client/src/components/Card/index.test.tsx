import { act, fireEvent, render } from '@testing-library/react';
import { Card } from './index'

const mockCardProps = {
  id: '123',
  name: 'Mario',
  cost: 144,
  category: 'Adventure',
  listGames:
    [
      {
        id: '123',
        name: 'Mario',
        cost: 144,
        category: 'Adventure'
      }
    ],
  setListGames: jest.fn(),
}

describe.skip('Components/Card', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Card
        {...mockCardProps}
      />
    );

    const cardElement = container.querySelector('.card--container');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement?.textContent?.includes('Mario')).toBe(true);
    expect(cardElement?.textContent?.includes('144')).toBe(true);
    expect(cardElement?.textContent?.includes('Adventure')).toBe(true);
  });

  describe('on card click', () => {
    it('should open modal', async () => {
      const { 
        container,
        getByTestId,
        getByLabelText,
        getByDisplayValue,
        getByRole,
        getByText
       } = render(
        <Card
          {...mockCardProps}
        />
      );

      const cardElement = container.querySelector('.card--container') as Element;

      await act(() => {
        fireEvent.click(cardElement);
      });

      expect(getByTestId('form-teste-id')).toBeInTheDocument();
      expect(getByLabelText('Nome')).toBeInTheDocument();
      expect(getByLabelText('Preço')).toBeInTheDocument();
      expect(getByLabelText('Categoria')).toBeInTheDocument();

      expect(getByDisplayValue('Mario')).toBeInTheDocument();
      expect(getByDisplayValue('144')).toBeInTheDocument();
      expect(getByDisplayValue('Adventure')).toBeInTheDocument();

      expect(getByRole('button', { name: 'Editar' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'Deletar' })).toBeInTheDocument();

      expect(getByText('Editar o Jogo:')).toBeInTheDocument();
    });
  });
});