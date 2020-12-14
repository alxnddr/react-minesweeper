import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { ResetButton } from '../ResetButton'
import { Status } from 'src/types'
import { Theme } from 'src/styles/Theme'

jest.mock('src/context/game', () => ({
  useGame: jest.fn(),
  useGameDispatch: jest.fn(),
}))

const {
  useGame,
  useGameDispatch,
}: { useGame: jest.Mock; useGameDispatch: jest.Mock } = jest.requireMock(
  'src/context/game'
)

describe('ResetButton', () => {
  const resetMock = jest.fn()

  const setup = (status: Status) => {
    useGame.mockImplementation(() => ({
      status,
    }))
    useGameDispatch.mockImplementation(() => ({ reset: resetMock }))

    const { getByRole } = render(<ResetButton />, { wrapper: Theme })
    const button = getByRole('button')

    return {
      button,
    }
  }

  it('renders 🙂 when game is in progress', () => {
    const { button } = setup(Status.inProgress)
    expect(button.textContent).toBe('🙂')
  })

  it('renders 😎 when game is in progress', () => {
    const { button } = setup(Status.won)
    expect(button.textContent).toBe('😎')
  })

  it('renders 😵 when game is in progress', () => {
    const { button } = setup(Status.lost)
    expect(button.textContent).toBe('😵')
  })

  it('resets game when clicked', () => {
    const { button } = setup(Status.inProgress)
    fireEvent.click(button)
    expect(resetMock).toBeCalled()
  })
})
