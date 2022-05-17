import classNames from 'classnames'
import { FunctionComponent } from 'react'
import useGameStore from '../../store/game'
import getCellInfo, { areCellsAligned } from '../../utils'
import SudokuCellCandidates from './SudokuCellCandidates'

const SudokuCell: FunctionComponent<{
  cellIndex: number
}> = ({ cellIndex }) => {
  const grid = useGameStore((state) => state.grid)
  const isCellLocked = useGameStore((state) => state.lockedCells[cellIndex])
  const errors = useGameStore((state) => state.errors[cellIndex])
  const selectedCell = useGameStore((state) => state.selectedCell)
  const lockedInsertNumber = useGameStore((state) => state.lockedInsertNumber)
  const selectCell = useGameStore((state) => state.selectCell)

  const selectedCellInfo =
    selectedCell != null ? getCellInfo(selectedCell) : null
  const cellInfo = getCellInfo(cellIndex)

  const isSelected = cellIndex === selectedCell && lockedInsertNumber == null

  const hasError = errors.size > 0

  const isSameNumberAsSelected =
    (lockedInsertNumber != null && grid[cellIndex] === lockedInsertNumber) ||
    (lockedInsertNumber == null &&
      selectedCell != null &&
      grid[cellIndex] &&
      !isSelected &&
      grid[cellIndex] === grid[selectedCell])

  const isSelectedHighlight =
    lockedInsertNumber != null &&
    cellIndex === selectedCell &&
    !isSameNumberAsSelected

  const isHighlighted =
    !isSameNumberAsSelected &&
    !isSelectedHighlight &&
    selectedCellInfo &&
    !isSelected &&
    (areCellsAligned(cellInfo, selectedCellInfo) ||
      cellInfo.quadrant.index === selectedCellInfo.quadrant.index)

  const isLocked =
    !isSelected &&
    !isSelectedHighlight &&
    !isSameNumberAsSelected &&
    !isHighlighted &&
    isCellLocked

  const hasGridRBorder = (cellInfo.x + 1) % 3 === 0 && cellInfo.x != 8
  const hasGridBBorder = (cellInfo.y + 1) % 3 === 0 && cellInfo.y != 8

  return (
    <div
      onClick={() => selectCell(cellIndex)}
      className={classNames(
        'aspect-square',
        isLocked ? 'bg-gray-100' : '',
        isSelectedHighlight ? 'bg-blue-300' : '',
        isSelected ? 'bg-blue-400 text-white' : '',
        isSameNumberAsSelected ? 'bg-blue-400 text-white' : '',
        isHighlighted ? 'bg-blue-100' : '',
        hasError ? 'text-red-600' : '',
        hasGridRBorder
          ? 'border-r-2 md:border-r-4 border-r-slate-900'
          : 'border-r border-slate-300',
        hasGridBBorder
          ? 'border-b-2 md:border-b-4 border-b-slate-900'
          : 'border-b border-slate-300'
      )}
    >
      {grid[cellIndex] ? (
        <div className="flex h-full w-full justify-center items-center text-xl md:text-4xl font-bold relative">
          {grid[cellIndex]}
        </div>
      ) : (
        <SudokuCellCandidates cellIndex={cellIndex} />
      )}
    </div>
  )
}

export default SudokuCell
