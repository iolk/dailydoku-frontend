export type QuadrantInfo = {
  x: number
  y: number
  index: number
}

export type CellInfo = {
  x: number
  y: number
  quadrant: QuadrantInfo
}

export const areCellsOnSameRow = (a: CellInfo, b: CellInfo) => a.x === b.x
export const areCellsOnSameCol = (a: CellInfo, b: CellInfo) => a.y === b.y
export const areCellsAligned = (a: CellInfo, b: CellInfo) =>
  a.x === b.x || a.y === b.y

export const getCellXY = (cell: number) => ({
  x: cell % 9,
  y: Math.floor(cell / 9)
})

export default function getCellInfo(cell: number): CellInfo {
  const cellXY = getCellXY(cell)
  return {
    ...cellXY,
    quadrant: {
      x: 3 * Math.floor(cellXY.x / 3),
      y: 3 * Math.floor(cellXY.y / 3),
      index: Math.floor(cellXY.x / 3) + 3 * Math.floor(cellXY.y / 3)
    }
  }
}
