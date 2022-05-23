import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { useLongPress } from 'use-long-press'
import useGameStore from '../../store/game'

const NumberPadButton: FunctionComponent<{
  number?: number
}> = ({ number }) => {
  const numberCounters = useGameStore((state) => state.numberCounters)
  const lockedInsertNumber = useGameStore((state) => state.lockedInsertNumber)
  const insertNumber = useGameStore((state) => state.insertNumber)
  const deleteNumber = useGameStore((state) => state.deleteNumber)
  const setLockedInsertNumber = useGameStore(
    (state) => state.setLockedInsertNumber
  )

  const isDisabled = numberCounters[number ?? 0] >= 9

  const bindLongPress = useLongPress(() => {
    if (isDisabled) {
      return
    }
    setLockedInsertNumber(number ?? null)
  })

  function handleClick() {
    if (isDisabled) {
      return
    }
    if (lockedInsertNumber && number !== lockedInsertNumber) {
      setLockedInsertNumber(null)
    } else {
      number ? insertNumber(number) : deleteNumber()
    }
  }

  return (
    <button
      {...bindLongPress()}
      onClick={() => handleClick()}
      className={classNames(
        'aspect-square flex-grow flex justify-center items-center rounded-xl text-lg md:text-3xl shadow-md',
        lockedInsertNumber === number ? 'bg-blue-500 text-white' : 'bg-white'
      )}
    >
      {isDisabled || lockedInsertNumber
        ? lockedInsertNumber === number
          ? number
          : ''
        : number ?? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
    </button>
  )
}

export default NumberPadButton
