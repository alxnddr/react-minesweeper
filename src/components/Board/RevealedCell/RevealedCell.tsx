import { memo } from 'react'
import { Value } from 'src/types'
import { RevealedCellRoot } from './styles'

interface Props {
  value: Value
  highlighted: boolean
}

export const RevealedCell = memo(({ value, highlighted }: Props) => {
  const isMine = value === Value.mine
  const isNumber = !isMine && value !== Value.empty

  return (
    <RevealedCellRoot highlighted={highlighted} value={value}>
      {isMine && '💣'}
      {isNumber && value}
    </RevealedCellRoot>
  )
})

RevealedCell.displayName = 'RevealedCell'
