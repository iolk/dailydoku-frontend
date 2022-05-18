import { Difficulty } from 'fake-sudoku-puzzle-generator'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { checkWin, computeErrors, generateGrid } from '../utils/generateGrid'

export type GameState = {
  isGameWin: boolean
  isGameInitialized: boolean
  isCandidatesMode: boolean
  selectedCell: number | null
  lockedInsertNumber: number | null
  grid: (number | null)[]
  lockedCells: boolean[]
  errors: Set<number>[]
  candidates: Set<number>[]
  numberCounters: number[]
}

const initialGameState: () => GameState = () => ({
  isGameWin: false,
  isGameInitialized: false,
  isCandidatesMode: false,
  selectedCell: null,
  lockedInsertNumber: null,
  grid: Array(81).fill(null),
  lockedCells: Array(81).fill(false),
  numberCounters: Array(10).fill(0),
  errors: [...Array(81)].map(() => new Set()),
  candidates: [...Array(81)].map(() => new Set())
})

const useGameStore = create(
  persist<
    GameState & {
      toggleIsCandidatesMode: () => void

      restartGame: (difficulty: Difficulty) => void

      insertNumber: (number: number | null) => void
      replaceNumber: (number: number | null) => void

      removeErrors: () => void

      toggleCandidate: (number: number) => void

      selectCell: (cell: number | null) => void
      setSelectedCell: (cell: number | null) => void
      setLockedInsertNumber: (number: number | null) => void
    }
  >(
    (set, get) => ({
      ...initialGameState(),

      toggleIsCandidatesMode: () =>
        set((state) => ({
          ...state,
          isCandidatesMode: !state.isCandidatesMode
        })),

      restartGame: (difficulty: Difficulty) => {
        const grid = generateGrid(difficulty)

        set((state) => {
          const lockedCellsCopy = [...state.lockedCells]
          const numberCountersCopy = [...state.numberCounters]

          grid.forEach((number, index) => {
            if (number) {
              numberCountersCopy[number]++
              lockedCellsCopy[index] = true
            }
          })

          return {
            ...state,
            ...initialGameState(),
            grid: grid,
            lockedCells: lockedCellsCopy,
            numberCounters: numberCountersCopy,
            isGameInitialized: true
          }
        })
      },

      insertNumber: (number) => {
        const state = get()
        if (state.selectedCell === null) {
          return
        }
        const isCellLocked = state.lockedCells[state.selectedCell]
        const cellHasNumber = state.grid[state.selectedCell] !== null

        if (
          isCellLocked ||
          (cellHasNumber && state.isCandidatesMode) ||
          (cellHasNumber && state.lockedInsertNumber)
        ) {
          return
        }

        if (state.isCandidatesMode) {
          number !== null && state.toggleCandidate(number)
        } else {
          state.replaceNumber(number)
          state.removeErrors()

          if (number !== null) {
            const errors = computeErrors(
              state.selectedCell,
              state.grid,
              state.errors
            )
            const isGameWin = checkWin(state.grid, state.errors)

            set((state) => ({
              ...state,
              errors,
              isGameWin
            }))
          }
        }
      },

      removeErrors: () =>
        set((state) => {
          if (state.selectedCell === null) {
            return state
          }

          const errorsCopy = [...state.errors]
          for (const index of errorsCopy[state.selectedCell]) {
            errorsCopy[index].delete(state.selectedCell)
          }
          errorsCopy[state.selectedCell].clear()

          return {
            ...state,
            errors: errorsCopy
          }
        }),

      replaceNumber: (number) =>
        set((state) => {
          if (state.selectedCell == null) {
            return state
          }

          const gridCopy = [...state.grid]
          const numberCountersCopy = [...state.numberCounters]

          const previousNumber = gridCopy[state.selectedCell]

          gridCopy[state.selectedCell] = number
          if (previousNumber) {
            numberCountersCopy[previousNumber]--
          }
          if (number) {
            numberCountersCopy[number]++
          }

          return {
            ...state,
            grid: gridCopy,
            numberCounters: numberCountersCopy,
            lockedInsertNumber:
              numberCountersCopy[number ?? 0] >= 9
                ? null
                : state.lockedInsertNumber
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

      selectCell: (cell: number | null) => {
        const state = get()
        state.setSelectedCell(cell)

        if (state.lockedInsertNumber) {
          state.insertNumber(state.lockedInsertNumber)
        }
      },

      setSelectedCell: (cell: number | null) =>
        set((state) => {
          return {
            ...state,
            selectedCell: cell
          }
        }),

      setLockedInsertNumber: (number: number | null) =>
        set((state) => ({
          ...state,
          lockedInsertNumber: number
        }))
    }),
    {
      name: 'game-storage', // name of item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used

      serialize: (state) => {
        const stateCopy = {
          ...state,
          state: {
            ...state.state,
            errors: [
              ...state.state.errors.map((errorSet) => Array.from(errorSet))
            ],
            candidates: [
              ...state.state.candidates.map((candidatesSet) =>
                Array.from(candidatesSet)
              )
            ]
          }
        }
        return JSON.stringify(stateCopy)
      },
      deserialize: (str) => {
        const state = JSON.parse(str)
        return {
          ...state,
          state: {
            ...state.state,
            errors: [
              ...state.state.errors.map(
                (errorArray: number[]) => new Set(errorArray)
              )
            ],
            candidates: [
              ...state.state.candidates.map(
                (candidatesArray: number[]) => new Set(candidatesArray)
              )
            ]
          }
        }
      }
    }
  )
)

export default useGameStore
