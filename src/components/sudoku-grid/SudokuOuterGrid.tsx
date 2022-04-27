import classNames from 'classnames'
import { FunctionComponent, useState } from 'react'

const SudokuCell: FunctionComponent<{
  isSelected?: boolean
  onClick: () => void
}> = ({ isSelected = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classNames('h-20 w-20', isSelected ? 'bg-red-200' : '')}
    >
      <div className="flex h-full w-full justify-center items-center font-bold text-4xl">
        1
      </div>
    </div>
  )
}

const SudokuInnerGrid: FunctionComponent<{
  cellSelected: number
  onCellSelected: (cellSelected: number) => void
}> = ({ cellSelected, onCellSelected }) => {
  const arr = Array(3).fill(1)
  return (
    <div className="grid grid-cols-1 divide-y-2 divide-gray-200">
      {arr.map(() => (
        <div className="grid grid-cols-3 divide-x-2 divide-gray-200">
          {arr.map(() => (
            <SudokuCell
              onClick={() => {
                onCellSelected(3)
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const SudokuOuterGrid: FunctionComponent = () => {
  const [cellSelected, setCellSelected] = useState(0)
  const arr = Array(3).fill(1)
  return (
    <div>
      {cellSelected}
      <div className="grid grid-cols-1 divide-y-[6px] divide-gray-300 border-[6px] border-black">
        {arr.map(() => (
          <div className="grid grid-cols-3 divide-x-[6px] divide-gray-300">
            {arr.map(() => (
              <SudokuInnerGrid
                cellSelected={cellSelected}
                onCellSelected={setCellSelected}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SudokuOuterGrid
