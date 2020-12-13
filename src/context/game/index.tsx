import { createContext, useContext, useReducer } from 'react'
import { Position, Settings } from 'src/types'
import { gameReducer, getInitialState } from './game-reducer'
import { GameState, Dispatch } from './types'

const GameContext = createContext<GameState | null>(null)
const GameDispatchContext = createContext<Dispatch | null>(null)

export const useGame = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }

  return context
}

export const useGameDispatch = () => {
  const dispatch = useContext(GameDispatchContext)

  if (!dispatch) {
    throw new Error('useGameDispatch must be used within a GameProvider')
  }

  return {
    openCell: (cell: Position) => {
      dispatch({
        type: 'OPEN_CELL',
        cell
      })
    },
    toggleFlag: (cell: Position) => {
      dispatch({
        type: 'TOGGLE_CELL_MARKING',
        cell
      })
    },
    reset: () => {
      dispatch({
        type: 'RESET_GAME'
      })
    },
    startGame: (settings: Settings) => {
      dispatch({
        type: 'START_GAME',
        settings
      })
    }
  }
}

export const GameProvider: React.FC = ({ children }) => {
  const initialSettings = {
    size: {
      rows: 0,
      cols: 0
    },
    mines: 0
  }

  const [state, dispatch] = useReducer(
    gameReducer,
    initialSettings,
    getInitialState
  )

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  )
}
