import classNames from 'classnames'
import { FunctionComponent } from 'react'
import useGameStore from '../../store/game'

const SudokuCellCandidates: FunctionComponent<{
  cellIndex: number
}> = ({ cellIndex }) => {
  const lockedInsertNumber = useGameStore((state) => state.lockedInsertNumber)
  const candidates = useGameStore((state) => state.candidates[cellIndex])
  const { grid, selectedCell } = useGameStore((state) => state)

  const isSelected = cellIndex === selectedCell
  function isSameNumberAsSelected(candidate: number) {
    return (
      (selectedCell && candidate === grid[selectedCell]) ||
      candidate === lockedInsertNumber
    )
  }

  return (
    <div
      className={classNames(
        'grid grid-cols-3 grid-rows-3 w-full h-full',
        isSelected ? 'text-white' : 'text-gray-700 '
      )}
    >
      {[...Array(9).keys()].map((number) => (
        <div key={number} className="flex justify-center items-center ">
          <div
            className={classNames(
              'rounded-md h-[14px] w-[14px] md:h-4 md:w-4 flex items-center justify-center text-xs md:text-sm',
              !candidates.has(number + 1) ? 'hidden' : '',
              isSameNumberAsSelected(number + 1) ? 'bg-blue-400 text-white' : ''
            )}
          >
            {candidates.has(number + 1) ? number + 1 : ''}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SudokuCellCandidates
