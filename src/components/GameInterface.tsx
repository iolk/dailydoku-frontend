import { FunctionComponent } from 'react'
import useGameStore from '../store/game'
import GameInitModal from './GameInitModal'
import GameWinModal from './GameWinModal'
import NumberPadMobile from './number-pad/NumberPadMobile'
import SudokuGrid from './sudoku-grid/SudokuGrid'

const GameInterface: FunctionComponent = () => {
  const isGameWin = useGameStore((state) => state.isGameWin)
  const isGameInitialized = useGameStore((state) => state.isGameInitialized)

  return (
    <div>
      {isGameWin ? <GameWinModal /> : ''}
      {!isGameInitialized ? <GameInitModal /> : ''}

      <div className="min-h-screen relative flex justify-center items-center bg-slate-900">
        <div className="z-10 w-full md:w-9/12 px-2 md:px-0 mx-auto lg:flex gap-10">
          <div className="w-full">
            <SudokuGrid />
          </div>

          <div className="mt-6 md:mt-10 lg:mt-0 lg:flex items-center lg:w-3/5">
            <NumberPadMobile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameInterface
