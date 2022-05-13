import { Difficulty } from 'fake-sudoku-puzzle-generator'
import { FunctionComponent, useState } from 'react'
import useGameStore from '../store/game'

const GameResetButton: FunctionComponent = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium')
  const { restartGame } = useGameStore((state) => state)

  return (
    <div className="flex">
      <select
        defaultValue={difficulty}
        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        className="px-3 py-2 text-base rounded-l-lg bg-white"
      >
        <option value="Very Easy">Molto facile</option>
        <option value="Easy">Facile</option>
        <option value="Medium">Medio</option>
        <option value="Hard">Difficile</option>
      </select>
      <button
        onClick={() => restartGame(difficulty)}
        className="bg-blue-500 hover:bg-blue-400 text-white rounded-r-lg h-[] px-3 py-2 text-base font-bold"
      >
        Genera
      </button>
    </div>
  )
}

export default GameResetButton
