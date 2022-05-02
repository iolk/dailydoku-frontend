import create from 'zustand'

const useSettingsStore = create<{
  isCandidatesMode: boolean
  toggleIsCandidatesMode: () => void
}>((set) => ({
  isCandidatesMode: false,

  toggleIsCandidatesMode: () =>
    set((state) => ({
      ...state,
      isCandidatesMode: !state.isCandidatesMode
    }))
}))

export default useSettingsStore
