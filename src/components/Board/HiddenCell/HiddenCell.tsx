import { memo } from 'react'
import { useGameDispatch } from 'src/context/game'
import { HiddenCellRoot } from './styles'

interface Props {
  flagged: boolean
  row: number
  col: number
}

export const HiddenCell = memo(({ row, col, flagged }: Props) => {
  const { openCell, toggleFlag } = useGameDispatch()

  const handleClick = () => {
    if (!flagged) {
      openCell({ row, col })
    }
  }
  const handleContextMenu = () => toggleFlag({ row, col })

  return (
    <HiddenCellRoot onClick={handleClick} onContextMenu={handleContextMenu}>
      {flagged && '🚩'}
    </HiddenCellRoot>
  )
})

HiddenCell.displayName = 'HiddenCell'
