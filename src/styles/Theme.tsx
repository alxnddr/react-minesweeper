import { ThemeProvider } from 'styled-components'

export const theme = {
  colors: {
    mainBackground: `#dddddd`,
    borderLight: `#e6e6e6`,
    borderDark: `#c0c0c0`
  },
  cellSize: '22px'
}

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
