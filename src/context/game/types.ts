import { Cell, Position, Settings, Status } from 'src/types'

export type Action =
  | { type: 'TOGGLE_CELL_MARKING'; cell: Position }
  | { type: 'OPEN_CELL'; cell: Position }
  | { type: 'START_GAME'; settings: Settings }
  | { type: 'RESET_GAME' }

export interface GameState {
  board: Cell[][]
  settings: Settings
  isInitialized: boolean
  status: Status
  markedCount: number
}

export type Dispatch = (action: Action) => void
