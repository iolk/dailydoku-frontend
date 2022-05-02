import { FunctionComponent, useEffect } from 'react'
import useGameStore from '../../store/game'
import useSettingsStore from '../../store/settings'
import SudokuCell from './SudokuCell'

const SudokuGrid: FunctionComponent = () => {
  const { grid, insertNumber, toggleCandidate } = useGameStore((state) => state)
  const { isCandidatesMode } = useSettingsStore((state) => state)

  function insertNumberFromKeyboard(e: KeyboardEvent) {
    const number = Number(e.key)
    if (number >= 1 && number <= 9) {
      if (isCandidatesMode) {
        toggleCandidate(number)
      } else {
        insertNumber(number)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', insertNumberFromKeyboard)

    return () => {
      window.removeEventListener('keydown', insertNumberFromKeyboard)
    }
  })

  return (
    <div className="grid grid-cols-9 grid-rows-9 rounded-2xl shadow-xl overflow-hidden">
      {grid.map((cell, index) => (
        <SudokuCell key={index} cellIndex={index} />
      ))}
    </div>
  )
}

export default SudokuGrid
