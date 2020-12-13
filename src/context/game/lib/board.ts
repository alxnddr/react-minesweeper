import { Cell, Position, Settings, State, Value } from 'src/types'
import {
  flatIndexToLocation,
  getNeighbours,
  locationToFlatIndex
} from './position'
import { shuffle } from './shuffle'

const cloneBoard = (board: Cell[][]): Cell[][] =>
  board.map(cells => cells.map(cell => ({ ...cell })))

const generateMinesLocations = (
  { size, mines }: Settings,
  excludedCells: Position[]
) => {
  const availableCells: Position[] = []
  const excludedFlatIndices = new Set(
    excludedCells.map(cell => locationToFlatIndex(cell, size.cols))
  )
  const totalCells = size.cols * size.rows

  for (let i = 0; i < totalCells - excludedFlatIndices.size; i++) {
    if (!excludedFlatIndices.has(i)) {
      availableCells.push(flatIndexToLocation(i, size.cols))
    }
  }

  return shuffle(availableCells).slice(0, mines)
}

const getOpenBombNeighbourBoard = (position: Position, board: Cell[][]) => {
  const { row, col } = position

  return board.map((cells, i) => {
    if (i === row) {
      return cells.map((cell, j) => {
        if (j === col) {
          return {
            value: cell.value,
            state: State.revealed
          }
        }

        return cell
      })
    }

    return cells
  })
}

const getOpenBombBoard = (position: Position, board: Cell[][]) => {
  const { row, col } = position

  return board.map((cells, i) => {
    return cells.map((cell, j) => {
      if (cell.value === Value.mine) {
        const isOpenedBomb = i === row && j === col

        return {
          value: cell.value,
          state: isOpenedBomb ? State.lost : State.revealed
        }
      }

      return cell
    })
  })
}

const getOpenEmptyCellBoard = (
  emptyCellPosition: Position,
  board: Cell[][]
) => {
  const { row, col } = emptyCellPosition
  const size = {
    rows: board.length,
    cols: board[0].length
  }

  const newBoard = cloneBoard(board)

  newBoard[row][col].state = State.revealed

  const stack: Position[] = [emptyCellPosition]

  while (stack.length > 0) {
    const currentCell = stack.pop()!

    getNeighbours(currentCell, size).forEach(cell => {
      const currentState = newBoard[cell.row][cell.col].state

      if (currentState === State.revealed || currentState === State.marked) {
        return
      }

      newBoard[cell.row][cell.col].state = State.revealed

      const value = newBoard[cell.row][cell.col].value

      if (value === Value.empty) {
        stack.push(cell)
      }
    })
  }

  return newBoard
}

export const getEmptyBoard = (settings: Settings) => {
  const board: Cell[][] = []

  for (let row = 0; row < settings.size.rows; row++) {
    board[row] = []

    for (let col = 0; col < settings.size.cols; col++) {
      board[row][col] = {
        value: Value.empty,
        state: State.hidden
      }
    }
  }

  return board
}

export const getNextBoard = (openedPosition: Position, board: Cell[][]) => {
  const { row, col } = openedPosition
  const { value } = board[row][col]

  switch (value) {
    case Value.mine:
      return getOpenBombBoard(openedPosition, board)
    case Value.empty:
      return getOpenEmptyCellBoard(openedPosition, board)
    default:
      return getOpenBombNeighbourBoard(openedPosition, board)
  }
}

export const getBoardWithRandomizedMines = (
  prevBoard: Cell[][],
  startPosition: Position,
  settings: Settings
) => {
  const board = cloneBoard(prevBoard)

  const excludedCells = [
    startPosition,
    ...getNeighbours(startPosition, settings.size)
  ]
  const minesLocations = generateMinesLocations(settings, excludedCells)

  minesLocations.forEach(mineLocation => {
    board[mineLocation.row][mineLocation.col].value = Value.mine

    getNeighbours(mineLocation, settings.size).forEach(({ row, col }) => {
      if (board[row][col].value !== Value.mine) {
        board[row][col].value++
      }
    })
  })

  return board
}

export const getToggleMarkingCellBoard = (
  position: Position,
  board: Cell[][]
) => {
  const { row, col } = position

  return board.map((cells, i) => {
    if (i === row) {
      return cells.map((cell, j) => {
        if (j === col) {
          const isFlagged = cell.state === State.marked
          return {
            value: cell.value,
            state: isFlagged ? State.hidden : State.marked
          }
        }

        return cell
      })
    }

    return cells
  })
}
