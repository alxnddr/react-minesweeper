import { useEffect, useState } from 'react'
import { useGame } from 'src/context/game'
import { Status } from 'src/types'
import { Stats } from '../Stats'

export const Timer = () => {
  const [counter, setCounter] = useState<number>(0)
  const { isInitialized, status } = useGame()

  useEffect(() => {
    if (!isInitialized) {
      setCounter(0)
      return
    }

    if (status !== Status.inProgress) {
      return
    }

    const intervalId = setInterval(() => {
      setCounter(prev => prev + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isInitialized, status])

  return <Stats value={counter} />
}
