import classNames from 'classnames'
import { FunctionComponent } from 'react'

const SudokuCell: FunctionComponent<{
  isSelected?: boolean
}> = ({ isSelected = false }) => {
  return (
    <div className={classNames('h-20 w-20', isSelected ? 'bg-red-200' : '')}>
      <div className="flex h-full w-full justify-center items-center font-bold text-4xl">
        1
      </div>
    </div>
  )
}

const SudokuInnerGrid: FunctionComponent = () => {
  return (
    <div className="grid grid-cols-1 divide-y-2 divide-gray-200">
      <div className="grid grid-cols-3 divide-x-2 divide-gray-200">
        <SudokuCell />
        <SudokuCell />
        <SudokuCell />
      </div>
      <div className="grid grid-cols-3 divide-x-2 divide-gray-200">
        <SudokuCell />
        <SudokuCell />
        <SudokuCell />
      </div>
      <div className="grid grid-cols-3 divide-x-2 divide-gray-200">
        <SudokuCell />
        <SudokuCell />
        <SudokuCell />
      </div>
    </div>
  )
}

const SudokuOuterGrid: FunctionComponent = () => {
  return (
    <div>
      <div className="grid grid-cols-1 divide-y-[6px] divide-gray-300 border-[6px] border-black">
        <div className="grid grid-cols-3 divide-x-[6px] divide-gray-300">
          <SudokuInnerGrid />
          <SudokuInnerGrid />
          <SudokuInnerGrid />
        </div>
        <div className="grid grid-cols-3 divide-x-[6px] divide-gray-300">
          <SudokuInnerGrid />
          <SudokuInnerGrid />
          <SudokuInnerGrid />
        </div>
        <div className="grid grid-cols-3 divide-x-[6px] divide-gray-300">
          <SudokuInnerGrid />
          <SudokuInnerGrid />
          <SudokuInnerGrid />
        </div>
      </div>
    </div>
  )
}

export default SudokuOuterGrid
