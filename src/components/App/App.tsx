import { GameProvider } from 'src/context/game'
import { Theme } from 'src/styles/Theme'
import { Menu } from '../Menu'
import { Board } from '../Board'
import { Header } from '../Header'
import { GlobalStyle } from 'src/styles/global'
import { AppWrapper, AppRoot } from './styles'

export const App = () => (
  <Theme>
    <GlobalStyle />
    <GameProvider>
      <AppWrapper>
        <AppRoot>
          <Menu />
          <Header />
          <Board />
        </AppRoot>
      </AppWrapper>
    </GameProvider>
  </Theme>
)
