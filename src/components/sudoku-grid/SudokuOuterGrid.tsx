import { FunctionComponent } from 'react'

const SudokuCell: FunctionComponent = () => {
  return <div className="h-20 w-20 border">1</div>
}

const SudokuInnerGrid: FunctionComponent = () => {
  return (
    <div className="grid grid-cols-3 border">
      <SudokuCell />
      <SudokuCell />
      <SudokuCell />
      <SudokuCell />
      <SudokuCell />
      <SudokuCell />
      <SudokuCell />
      <SudokuCell />
      <SudokuCell />
    </div>
  )
}

const SudokuOuterGrid: FunctionComponent = () => {
  return (
    <div className="grid grid-cols-3 border">
      <SudokuInnerGrid />
      <SudokuInnerGrid />
      <SudokuInnerGrid />
      <SudokuInnerGrid />
      <SudokuInnerGrid />
      <SudokuInnerGrid />
      <SudokuInnerGrid />
      <SudokuInnerGrid />
      <SudokuInnerGrid />
    </div>
  )
}

export default SudokuOuterGrid
