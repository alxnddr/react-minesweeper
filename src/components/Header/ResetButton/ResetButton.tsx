import { useGame, useGameDispatch } from 'src/context/game'
import { Status } from 'src/types'
import { ResetButtonRoot } from './styles'

export const ResetButton = () => {
  const { status } = useGame()
  const { reset } = useGameDispatch()

  return (
    <ResetButtonRoot onClick={() => reset()}>
      {status === Status.inProgress && '🙂'}
      {status === Status.won && '😎'}
      {status === Status.lost && '😵'}
    </ResetButtonRoot>
  )
}
