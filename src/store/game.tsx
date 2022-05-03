import create from 'zustand'
import getCellInfo from '../utils'

const useGameStore = create<{
  selectedCell: number | null
  grid: (number | null)[]
  errors: Set<number>[]
  candidates: Set<number>[]

  insertNumber: (number: number) => void
  deleteNumber: () => void
  replaceNumber: (number: number | null) => void
  computeErrors: () => void
  toggleCandidate: (number: number) => void
  setselectedCell: (selectedCell: number | null) => void
}>((set, get) => ({
  selectedCell: null,
  grid: Array(81).fill(null),
  errors: [...Array(81)].map(() => new Set()),
  candidates: [...Array(81)].map(() => new Set()),

  insertNumber: (number) => {
    get().replaceNumber(number)
    get().computeErrors()
  },
  deleteNumber: () => {
    get().replaceNumber(null)
    get().computeErrors()
  },

  replaceNumber: (number) =>
    set((state) => {
      if (state.selectedCell == null) {
        return state
      }

      const gridCopy = [...state.grid]
      gridCopy[state.selectedCell] = number

      return {
        ...state,
        grid: gridCopy
      }
    }),

  computeErrors: () =>
    set((state) => {
      const errorsCopy = [...state.errors]
      if (state.selectedCell == null) {
        return state
      }
      const info = getCellInfo(state.selectedCell)

      // Row check
      for (let i = info.x; i < 9; i++) {
        console.log(i)
        if (
          i != state.selectedCell &&
          state.grid[i] &&
          state.grid[i] === state.grid[state.selectedCell]
        ) {
          errorsCopy[i].add(state.selectedCell)
          errorsCopy[state.selectedCell].add(i)
        }
      }
      // Column check
      for (let i = info.y; i < 81; i += 9) {
        console.log(i)
        if (
          i != state.selectedCell &&
          state.grid[i] &&
          state.grid[i] === state.grid[state.selectedCell]
        ) {
          errorsCopy[i].add(state.selectedCell)
          errorsCopy[state.selectedCell].add(i)
        }
      }
      // Box check
      for (let i = info.quadrant.x; i < info.quadrant.x + 3; i++) {
        for (let j = info.quadrant.y; j < info.quadrant.y + 3; j++) {
          const cell = i + j * 9
          if (
            cell != state.selectedCell &&
            state.grid[cell] &&
            state.grid[cell] === state.grid[state.selectedCell]
          ) {
            errorsCopy[cell].add(state.selectedCell)
            errorsCopy[state.selectedCell].add(cell)
          }
        }
      }
      console.log(errorsCopy)

      return {
        ...state,
        errors: errorsCopy
      }
    }),

  toggleCandidate: (number) =>
    set((state) => {
      if (state.selectedCell == null) {
        return state
      }
      const candidatesCopy = [...state.candidates]

      if (candidatesCopy[state.selectedCell].has(number)) {
        candidatesCopy[state.selectedCell].delete(number)
      } else {
        candidatesCopy[state.selectedCell].add(number)
      }

      return {
        ...state,
        candidates: candidatesCopy
      }
    }),

  setselectedCell: (selectedCell: number | null) =>
    set((state) => ({
      ...state,
      selectedCell: selectedCell
    }))
}))

export default useGameStore
