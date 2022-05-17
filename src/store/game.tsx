import { Difficulty, getSudoku } from 'fake-sudoku-puzzle-generator'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import getCellInfo from '../utils'

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
  errors: [...Array(81)].map(() => new Set()),
  candidates: [...Array(81)].map(() => new Set()),
  numberCounters: Array(10).fill(0)
})

const useGameStore = create(
  persist<
    GameState & {
      toggleIsCandidatesMode: () => void

      restartGame: (difficulty: Difficulty) => void
      generateGrid: (difficulty: Difficulty) => void

      insertNumber: (number: number) => void
      deleteNumber: () => void
      replaceNumber: (number: number | null) => void
      checkWin: () => void

      computeErrors: () => void
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
        set((state) => ({
          ...state,
          ...initialGameState(),
          isGameInitialized: true
        }))

        get().generateGrid(difficulty)
      },

      generateGrid: (difficulty: Difficulty) =>
        set((state) => {
          if (state.grid.find((cell) => cell !== null)) {
            return state
          }

          const puzzle = getSudoku(difficulty)
          let i = 0
          const grid = []
          const numberCounters = Array(10).fill(0)
          for (const row of puzzle) {
            for (const element of row) {
              grid[i++] = element
              if (element) {
                numberCounters[element]++
                state.lockedCells[i - 1] = true
              }
            }
          }
          return {
            ...state,
            numberCounters,
            grid
          }
        }),

      checkWin: () => {
        const isWin =
          get().grid.every((cell) => cell != null) &&
          !get().errors.some((errors) => errors.size > 0)

        if (isWin) {
          set((state) => ({
            ...state,
            isGameWin: isWin
          }))
        }
      },

      insertNumber: (number) => {
        const selected = get().selectedCell
        const isCellLocked = selected && get().lockedCells[selected]
        const cellHasNumber = selected && get().grid[selected]

        if (
          isCellLocked ||
          (cellHasNumber && get().isCandidatesMode) ||
          (cellHasNumber && get().lockedInsertNumber)
        ) {
          return
        }

        if (get().isCandidatesMode) {
          get().toggleCandidate(number)
        } else {
          get().replaceNumber(number)
          get().removeErrors()

          if (number) {
            get().computeErrors()
            get().checkWin()
          }
        }
      },

      deleteNumber: () => {
        const selected = get().selectedCell
        if (selected && get().lockedCells[selected]) {
          return
        }
        get().replaceNumber(null)
        get().removeErrors()
      },

      removeErrors: () =>
        set((state) => {
          if (state.selectedCell == null) {
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

      computeErrors: () =>
        set((state) => {
          const errorsCopy = [...state.errors]
          if (state.selectedCell == null) {
            return state
          }
          const info = getCellInfo(state.selectedCell)

          // Row check
          for (let i = info.y * 9; i < info.y * 9 + 9; i++) {
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
          for (let i = info.x; i < 81; i += 9) {
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

      selectCell: (cell: number | null) => {
        get().setSelectedCell(cell)

        const lockedInsertNumber = get().lockedInsertNumber
        if (lockedInsertNumber) {
          get().insertNumber(lockedInsertNumber)
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
