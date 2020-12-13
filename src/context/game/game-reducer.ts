import { State } from './../../types/index'
import { Settings, Position, Status } from 'src/types'
import {
  getToggleMarkingCellBoard,
  getEmptyBoard,
  getBoardWithRandomizedMines,
  getNextBoard
} from './lib/board'
import { getStatus } from './lib/status'
import { GameState, Action } from './types'

export const getInitialState = (settings: Settings): GameState => {
  return {
    board: getEmptyBoard(settings),
    settings,
    status: Status.inProgress,
    markedCount: 0,
    isInitialized: false
  }
}

const resetGame = (prevState: GameState) => getInitialState(prevState.settings)

const openCell = (prevState: GameState, position: Position): GameState => {
  if (prevState.status !== Status.inProgress) {
    return prevState
  }

  const prevBoard = prevState.isInitialized
    ? prevState.board
    : getBoardWithRandomizedMines(prevState.board, position, prevState.settings)

  const board = getNextBoard(position, prevBoard)
  const status = getStatus(board, position, prevState.settings.mines)

  return {
    ...prevState,
    isInitialized: true,
    board,
    status
  }
}

const toggleFlag = (prevState: GameState, position: Position): GameState => {
  if (prevState.status !== Status.inProgress) {
    return prevState
  }

  const isFlagged =
    prevState.board[position.row][position.col].state === State.marked

  return {
    ...prevState,
    board: getToggleMarkingCellBoard(position, prevState.board),
    markedCount: isFlagged
      ? prevState.markedCount - 1
      : prevState.markedCount + 1
  }
}

export const gameReducer = (
  prevState: GameState,
  action: Action
): GameState => {
  switch (action.type) {
    case 'OPEN_CELL':
      return openCell(prevState, action.cell)
    case 'TOGGLE_CELL_MARKING':
      return toggleFlag(prevState, action.cell)
    case 'START_GAME':
      return getInitialState(action.settings)
    case 'RESET_GAME':
      return resetGame(prevState)
    default:
      return prevState
  }
}
