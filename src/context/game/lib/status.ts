import { Cell, Position, State, Status, Value } from 'src/types'

const countHiddenCells = (board: Cell[][]) =>
  board.reduce(
    (acc, cells) =>
      acc +
      cells.reduce(
        (acc, { state }) =>
          state === State.hidden || state === State.marked ? acc + 1 : acc,
        0
      ),
    0
  )

export const getStatus = (
  board: Cell[][],
  openedPosition: Position,
  minesCount: number
) => {
  const { row, col } = openedPosition
  const { value } = board[row][col]

  if (value === Value.mine) {
    return Status.lost
  }

  const hiddenCellsCount = countHiddenCells(board)

  return hiddenCellsCount === minesCount ? Status.won : Status.inProgress
}
