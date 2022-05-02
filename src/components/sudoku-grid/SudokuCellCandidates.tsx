import classNames from 'classnames'
import { FunctionComponent } from 'react'
import useGameStore from '../../store/game'

const SudokuCellCandidates: FunctionComponent<{
  cellIndex: number
}> = ({ cellIndex }) => {
  const candidates = useGameStore((state) => state.candidates[cellIndex])
  const { grid, selectedCell } = useGameStore((state) => state)

  function isSameNumberAsSelected(candidate: number) {
    return selectedCell && candidate === grid[selectedCell]
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
      {[...Array(9).keys()].map((number) => (
        <div key={number} className="flex justify-center items-center ">
          <div
            className={classNames(
              'rounded-full h-5 w-5 flex items-center justify-center',
              !candidates.has(number + 1) ? 'hidden' : '',
              isSameNumberAsSelected(number + 1)
                ? 'bg-blue-300 text-white'
                : 'text-gray-700 '
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
