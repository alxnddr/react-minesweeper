import styled, { css } from 'styled-components'
import { Value } from 'src/types'

const colorByValue: { [key: number]: string } = {
  [Value.one]: '#0000ff',
  [Value.two]: '#008100',
  [Value.three]: '#ff1300',
  [Value.four]: '#000083',
  [Value.five]: '#810500',
  [Value.six]: '#2a9494',
  [Value.seven]: '#000000',
  [Value.eight]: '#808080'
}

interface RootProps {
  highlighted: boolean
  value: Value
}

export const RevealedCellRoot = styled.div<RootProps>`
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  flex-shrink: 0;
  font-weight: 700;
  width: ${({ theme }) => theme.cellSize};
  height: ${({ theme }) => theme.cellSize};
  border-width: 1px;
  border-style: dotted;
  border-top-color: #cecece;
  border-left-color: #cecece;
  border-bottom-color: #c2c2c2;
  border-right-color: #c2c2c2;
  background-color: #d1d1d1;

  ${props =>
    props.highlighted &&
    css`
      border-style: solid;
      background-color: #f80000;
    `};

  ${props =>
    colorByValue[props.value] &&
    css`
      color: ${colorByValue[props.value]};
    `}
`
