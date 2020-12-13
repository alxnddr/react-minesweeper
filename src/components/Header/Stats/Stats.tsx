import { StatsRoot } from './styles'

interface Props {
  value: number
}

export const Stats = ({ value }: Props) => <StatsRoot>{value}</StatsRoot>
