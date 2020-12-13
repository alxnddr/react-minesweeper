import styled from 'styled-components'

export const MenuRoot = styled.ul`
  display: flex;
`

export const MenuItem = styled.li`
  cursor: pointer;
  padding: 8px 4px;
  transition: color 200ms;
  font-size: 14px;

  &:hover {
    color: #0000ff;
  }
`
