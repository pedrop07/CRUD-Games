import { act, fireEvent, render } from "@testing-library/react"
import { Teste } from "."

describe('Teste', () => {
  describe('on click open modal button', () => {
    it('should open modal', async () => {
      const { container, getByText } = render(<Teste />);

      const openModalButton = container.querySelector('td:last-child > button')!;

      await act(() => {
        fireEvent.click(openModalButton)
      })

      console.log(getByText('Shaodre'))

      expect(getByText('Shaodre')).toBeInTheDocument()
    })
  })
})