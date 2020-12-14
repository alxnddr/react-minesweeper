import { HeaderRoot } from './styles'
import { ResetButton } from './ResetButton'
import { Timer } from './Timer'
import { Stats } from './Stats'
import { useGame } from 'src/context/game'

export const Header = () => {
  const { markedCount, settings } = useGame()

  return (
    <HeaderRoot>
      <Stats value={settings.mines - markedCount} />
      <ResetButton />
      <Timer />
    </HeaderRoot>
  )
}
