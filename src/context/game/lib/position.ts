import { Position, Size } from 'src/types'

export const getNeighbours = ({ row, col }: Position, { rows, cols }: Size) => {
  const neighbours: Position[] = []

  // Top
  if (row > 0) {
    neighbours.push({
      row: row - 1,
      col: col
    })
  }

  // Bottom
  if (row < rows - 1) {
    neighbours.push({
      row: row + 1,
      col: col
    })
  }

  // Left
  if (col > 0) {
    neighbours.push({
      row: row,
      col: col - 1
    })
  }

  // Right
  if (col < cols - 1) {
    neighbours.push({
      row: row,
      col: col + 1
    })
  }

  // Top Left
  if (row > 0 && col > 0) {
    neighbours.push({
      row: row - 1,
      col: col - 1
    })
  }

  // Top Right
  if (row > 0 && col < cols - 1) {
    neighbours.push({
      row: row - 1,
      col: col + 1
    })
  }

  // Bottom Left
  if (row < rows - 1 && col > 0) {
    neighbours.push({
      row: row + 1,
      col: col - 1
    })
  }

  // Bottom Right
  if (row < rows - 1 && col < cols - 1) {
    neighbours.push({
      row: row + 1,
      col: col + 1
    })
  }

  return neighbours
}

export const locationToFlatIndex = ({ row, col }: Position, cols: number) => {
  return row * cols + col
}

export const flatIndexToLocation = (index: number, cols: number) => {
  return {
    row: Math.floor(index / cols),
    col: index % cols
  }
}
