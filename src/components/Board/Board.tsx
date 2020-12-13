import { useGame } from 'src/context/game'
import { Row } from './Row'
import { BoardRoot } from './styles'

export const Board = () => {
  const { board, status } = useGame()

  return (
    <BoardRoot onContextMenu={e => e.preventDefault()}>
      {board.map((cells, index) => (
        <Row status={status} key={index} cells={cells} row={index} />
      ))}
    </BoardRoot>
  )
}
