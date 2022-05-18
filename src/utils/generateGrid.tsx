import { Difficulty, getSudoku } from 'fake-sudoku-puzzle-generator'
import getCellInfo from '.'

export function checkWin(grid: (number | null)[], errors: Set<number>[]) {
  return (
    grid.every((cell) => cell != null) &&
    !errors.some((errors) => errors.size > 0)
  )
}

export function generateGrid(difficulty: Difficulty) {
  const puzzle = getSudoku(difficulty)

  let i = 0
  const grid = []

  for (const row of puzzle) {
    for (const puzzleNumber of row) {
      grid[i++] = puzzleNumber
    }
  }

  return grid
}

export function computeErrors(
  cellIndex: number,
  grid: (number | null)[],
  errors: Set<number>[]
) {
  const errorsCopy = [...errors]
  const info = getCellInfo(cellIndex)

  // Row check
  for (let i = info.y * 9; i < info.y * 9 + 9; i++) {
    if (i != cellIndex && grid[i] && grid[i] === grid[cellIndex]) {
      errorsCopy[i].add(cellIndex)
      errorsCopy[cellIndex].add(i)
    }
  }

  // Column check
  for (let i = info.x; i < 81; i += 9) {
    if (i != cellIndex && grid[i] && grid[i] === grid[cellIndex]) {
      errorsCopy[i].add(cellIndex)
      errorsCopy[cellIndex].add(i)
    }
  }

  // Box check
  for (let i = info.quadrant.x; i < info.quadrant.x + 3; i++) {
    for (let j = info.quadrant.y; j < info.quadrant.y + 3; j++) {
      const cell = i + j * 9
      if (cell != cellIndex && grid[cell] && grid[cell] === grid[cellIndex]) {
        errorsCopy[cell].add(cellIndex)
        errorsCopy[cellIndex].add(cell)
      }
    }
  }

  return errors
}
