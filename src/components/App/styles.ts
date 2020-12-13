import styled from 'styled-components'

export const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`

export const AppRoot = styled.div`
  margin: 0 auto;
  display: inline-flex;
  flex-direction: column;
  padding: 0 8px 8px 8px;
  background-color: ${({ theme }) => theme.colors.mainBackground};
`
