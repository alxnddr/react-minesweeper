import React, { memo } from 'react'
import { Cell as ICell, State, Status } from 'src/types'
import { RevealedCell } from '../RevealedCell'
import { HiddenCell } from '../HiddenCell'
import { RowRoot } from './styles'

interface Props {
  status: Status
  cells: ICell[]
  row: number
}

export const Row = memo(({ row, cells, status }: Props) => {
  return (
    <RowRoot>
      {cells.map(({ value, state }, index) => {
        if (state === State.marked || state === State.hidden) {
          const isFlagged = state === State.marked || status === Status.won

          return (
            <HiddenCell key={index} flagged={isFlagged} row={row} col={index} />
          )
        }

        return (
          <RevealedCell
            key={index}
            value={value}
            highlighted={state === State.lost}
          />
        )
      })}
    </RowRoot>
  )
})
