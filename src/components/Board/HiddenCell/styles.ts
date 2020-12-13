import styled from 'styled-components'

export const HiddenCellRoot = styled.div`
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  flex-shrink: 0;
  width: ${({ theme }) => theme.cellSize};
  height: ${({ theme }) => theme.cellSize};
  border-width: 1px;
  border-style: solid;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-bottom-color: ${({ theme }) => theme.colors.borderDark};
  border-right-color: ${({ theme }) => theme.colors.borderDark};
  background-color: ${({ theme }) => theme.colors.mainBackground};
`
