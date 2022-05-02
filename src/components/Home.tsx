import { FunctionComponent } from 'react'
import useSettingsStore from '../store/settings'
import SudokuGrid from './sudoku-grid/SudokuGrid'

const Home: FunctionComponent = () => {
  const { isCandidatesMode, toggleIsCandidatesMode } = useSettingsStore(
    (state) => state
  )

  return (
    <div>
      <input
        type="checkbox"
        defaultChecked={isCandidatesMode}
        onClick={() => toggleIsCandidatesMode()}
      />
      {isCandidatesMode ? 'si' : 'no'}
      <SudokuGrid />
    </div>
  )
}

export default Home
