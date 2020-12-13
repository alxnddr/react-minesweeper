import styled from 'styled-components'

export const Panel = styled.div`
  border-width: 2px;
  border-style: solid;
  border-top-color: ${({ theme }) => theme.colors.borderDark};
  border-left-color: ${({ theme }) => theme.colors.borderDark};
  border-bottom-color: ${({ theme }) => theme.colors.borderLight};
  border-right-color: ${({ theme }) => theme.colors.borderLight};
  background-color: ${({ theme }) => theme.colors.mainBackground};
`
