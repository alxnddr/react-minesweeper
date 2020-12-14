import { GameState } from './../types'
import { gameReducer } from '../game-reducer'
import { State, Status, Value } from 'src/types'

/*
  0 0 0
  0 0 0
  0 0 0
*/
const uninitializedState: GameState = {
  board: [
    [
      { value: Value.empty, state: State.hidden },
      { value: Value.empty, state: State.hidden },
      { value: Value.empty, state: State.hidden },
    ],
    [
      { value: Value.empty, state: State.hidden },
      { value: Value.empty, state: State.hidden },
      { value: Value.empty, state: State.hidden },
    ],
    [
      { value: Value.empty, state: State.hidden },
      { value: Value.empty, state: State.hidden },
      { value: Value.empty, state: State.hidden },
    ],
  ],
  status: Status.inProgress,
  isInitialized: false,
  markedCount: 0,
  settings: {
    size: {
      rows: 3,
      cols: 3,
    },
    mines: 2,
  },
}

/*
  M 2 M
  1 2 1
  0 0 0
*/
const initializedState: GameState = {
  board: [
    [
      { value: Value.mine, state: State.hidden },
      { value: Value.two, state: State.hidden },
      { value: Value.mine, state: State.hidden },
    ],
    [
      { value: Value.one, state: State.hidden },
      { value: Value.two, state: State.hidden },
      { value: Value.one, state: State.hidden },
    ],
    [
      { value: Value.empty, state: State.hidden },
      { value: Value.empty, state: State.hidden },
      { value: Value.empty, state: State.hidden },
    ],
  ],
  status: Status.inProgress,
  isInitialized: true,
  markedCount: 0,
  settings: {
    size: {
      rows: 3,
      cols: 3,
    },
    mines: 2,
  },
}

describe('gameReducer', () => {
  describe('when opening a mined cell', () => {
    const setup = () => {
      return gameReducer(initializedState, {
        type: 'OPEN_CELL',
        cell: { row: 0, col: 0 },
      })
    }

    it('changes game status to `lost`', () => {
      const { status } = setup()
      expect(status).toBe(Status.lost)
    })

    it('reveals all mines', () => {
      const { board } = setup()

      expect(board).toEqual([
        [
          { value: Value.mine, state: State.lost },
          { value: Value.two, state: State.hidden },
          { value: Value.mine, state: State.revealed },
        ],
        [
          { value: Value.one, state: State.hidden },
          { value: Value.two, state: State.hidden },
          { value: Value.one, state: State.hidden },
        ],
        [
          { value: Value.empty, state: State.hidden },
          { value: Value.empty, state: State.hidden },
          { value: Value.empty, state: State.hidden },
        ],
      ])
    })
  })

  describe('when opening a mine neighbour cell', () => {
    it('reveals only opened cell', () => {
      const { board } = gameReducer(initializedState, {
        type: 'OPEN_CELL',
        cell: { row: 1, col: 1 },
      })

      expect(board).toEqual([
        [
          { value: Value.mine, state: State.hidden },
          { value: Value.two, state: State.hidden },
          { value: Value.mine, state: State.hidden },
        ],
        [
          { value: Value.one, state: State.hidden },
          { value: Value.two, state: State.revealed },
          { value: Value.one, state: State.hidden },
        ],
        [
          { value: Value.empty, state: State.hidden },
          { value: Value.empty, state: State.hidden },
          { value: Value.empty, state: State.hidden },
        ],
      ])
    })
  })

  describe('when opening an empty cell', () => {
    it('reveals all neighbours up to mine neighbours', () => {
      const { board } = gameReducer(initializedState, {
        type: 'OPEN_CELL',
        cell: { row: 2, col: 0 },
      })

      expect(board).toEqual([
        [
          { value: Value.mine, state: State.hidden },
          { value: Value.two, state: State.hidden },
          { value: Value.mine, state: State.hidden },
        ],
        [
          { value: Value.one, state: State.revealed },
          { value: Value.two, state: State.revealed },
          { value: Value.one, state: State.revealed },
        ],
        [
          { value: Value.empty, state: State.revealed },
          { value: Value.empty, state: State.revealed },
          { value: Value.empty, state: State.revealed },
        ],
      ])
    })
  })

  describe('when opening first cell', () => {
    it('places mines on the board', () => {
      const { board } = gameReducer(uninitializedState, {
        type: 'OPEN_CELL',
        cell: { row: 0, col: 0 },
      })

      const minesCount = board.reduce(
        (acc, cells) =>
          acc +
          cells.reduce(
            (acc, { value }) => (value === Value.mine ? acc + 1 : acc),
            0
          ),
        0
      )

      expect(minesCount).toBe(uninitializedState.settings.mines)
    })
  })

  describe('when open all cells without mines', () => {
    it('sets status to `won`', () => {
      const { status } = gameReducer(
        {
          status: Status.inProgress,
          isInitialized: true,
          markedCount: 0,
          settings: {
            size: {
              rows: 3,
              cols: 3,
            },
            mines: 1,
          },
          /*
            M 1 0
            1 1 0
            0 0 0
          */
          board: [
            [
              { value: Value.mine, state: State.hidden },
              { value: Value.one, state: State.hidden },
              { value: Value.empty, state: State.hidden },
            ],
            [
              { value: Value.one, state: State.hidden },
              { value: Value.one, state: State.hidden },
              { value: Value.empty, state: State.hidden },
            ],
            [
              { value: Value.empty, state: State.hidden },
              { value: Value.empty, state: State.hidden },
              { value: Value.empty, state: State.hidden },
            ],
          ],
        },
        {
          type: 'OPEN_CELL',
          cell: { row: 2, col: 2 },
        }
      )

      expect(status).toBe(Status.won)
    })
  })
})
