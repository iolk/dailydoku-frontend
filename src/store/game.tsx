import create from 'zustand'

const useGameStore = create<{
  selectedCell: number | null
  grid: number[]
  candidates: Set<number>[]
  insertNumber: (number: number) => void
  toggleCandidate: (number: number) => void
  setselectedCell: (selectedCell: number | null) => void
}>((set) => ({
  selectedCell: null,
  grid: Array(81).fill(null),
  candidates: [...Array(81)].map(() => new Set()),

  insertNumber: (number) =>
    set((state) => {
      if (!state.selectedCell) {
        return state
      }
      const gridCopy = [...state.grid]
      gridCopy[state.selectedCell] = number
      return {
        ...state,
        grid: gridCopy
      }
    }),

  toggleCandidate: (number) =>
    set((state) => {
      console.log(state.candidates)
      if (!state.selectedCell) {
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
