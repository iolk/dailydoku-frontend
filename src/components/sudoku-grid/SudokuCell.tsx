import classNames from 'classnames'
import { FunctionComponent } from 'react'
import useGameStore from '../../store/game'
import getCellInfo, { areCellsAligned } from '../../utils'
import SudokuCellCandidates from './SudokuCellCandidates'

const SudokuCell: FunctionComponent<{
  cellIndex: number
}> = ({ cellIndex }) => {
  const { grid, errors, selectedCell, setselectedCell } = useGameStore(
    (state) => state
  )

  const selectedCellInfo =
    selectedCell != null ? getCellInfo(selectedCell) : null
  const cellInfo = getCellInfo(cellIndex)

  const isSelected = cellIndex === selectedCell
  const hasError = errors[cellIndex].size > 0
  const isSameNumberAsSelected =
    selectedCell != null &&
    grid[cellIndex] &&
    !isSelected &&
    grid[cellIndex] === grid[selectedCell]
  const isHighlighted =
    !isSameNumberAsSelected &&
    selectedCellInfo &&
    !isSelected &&
    (areCellsAligned(cellInfo, selectedCellInfo) ||
      cellInfo.quadrant.index === selectedCellInfo.quadrant.index)

  const hasGridRBorder = (cellInfo.x + 1) % 3 === 0 && cellInfo.x != 8
  const hasGridBBorder = (cellInfo.y + 1) % 3 === 0 && cellInfo.y != 8

  return (
    <div
      onClick={() => setselectedCell(cellIndex)}
      className={classNames(
        'h-20 w-20',
        isSelected ? 'bg-red-200' : '',
        isHighlighted ? 'bg-blue-200' : '',
        isSameNumberAsSelected ? 'bg-green-200' : '',
        hasError ? 'text-red-600' : '',
        hasGridRBorder ? 'border-r-4 border-r-blue-400' : 'border-r',
        hasGridBBorder ? 'border-b-4 border-b-blue-400' : 'border-b'
      )}
    >
      {grid[cellIndex] ? (
        <div className="flex h-full w-full justify-center items-center font-medium text-4xl">
          {grid[cellIndex]}
        </div>
      ) : (
        <SudokuCellCandidates cellIndex={cellIndex} />
      )}
    </div>
  )
}

export default SudokuCell
