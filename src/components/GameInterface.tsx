import { FunctionComponent, useEffect } from 'react'
import useGameStore from '../store/game'
import NumberPadDesktop from './number-pad/NumberPadDesktop'
import NumberPadMobile from './number-pad/NumberPadMobile'
import SudokuGrid from './sudoku-grid/SudokuGrid'

const GameInterface: FunctionComponent = () => {
  const generateGrid = useGameStore((state) => state.generateGrid)

  useEffect(() => {
    generateGrid()
  })

  return (
    <div className="min-h-screen relative flex justify-center items-center bg-slate-900">
      {/* <div className="absolute h-screen bottom-0 w-full overflow-hidden">
        <div className="absolute bottom-0 h-3/5 translate-y-32 -skew-y-12 bg-blue-400 w-full" />
      </div> */}
      <div className="z-10 w-full md:w-9/12 px-2 md:px-0 mx-auto lg:flex gap-10">
        <SudokuGrid />
        <div className="hidden">
          <NumberPadDesktop />
        </div>
        <div className="mt-6 md:mt-10 lg:w-3/5">
          <NumberPadMobile />
        </div>
      </div>
    </div>
  )
}

export default GameInterface
