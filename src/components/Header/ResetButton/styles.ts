import styled from 'styled-components'

export const ResetButtonRoot = styled.button`
  padding: 0;
  padding-left: 3px;
  font-size: 16px;
  height: 26px;
  width: 26px;
  margin: 0 auto;
  line-height: 1px;
  border-width: 2px;
  border-style: solid;
  text-align: center;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-bottom-color: ${({ theme }) => theme.colors.borderDark};
  border-right-color: ${({ theme }) => theme.colors.borderDark};
  background-color: ${({ theme }) => theme.colors.mainBackground};
  outline: none;
  cursor: pointer;
`
