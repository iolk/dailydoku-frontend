import { FunctionComponent, useEffect } from 'react'
import useGameStore from '../../store/game'
import SudokuCell from './SudokuCell'

const SudokuGrid: FunctionComponent = () => {
  const { insertNumber, deleteNumber } = useGameStore((state) => state)

  function manageInputFromKeyboard(e: KeyboardEvent) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      deleteNumber()
      return
    }

    const number = Number(e.key)
    if (number >= 1 && number <= 9) {
      insertNumber(number)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', manageInputFromKeyboard)

    return () => {
      window.removeEventListener('keydown', manageInputFromKeyboard)
    }
  })

  return (
    <div className="w-full grid grid-cols-9 grid-rows-9 rounded-2xl shadow-xl overflow-hidden bg-white">
      {[...Array(81)].map((_, index) => (
        <SudokuCell key={index} cellIndex={index} />
      ))}
    </div>
  )
}

export default SudokuGrid
