import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { useLongPress } from 'use-long-press'
import useGameStore from '../../store/game'

const NumberPadButton: FunctionComponent<{
  number?: number
}> = ({ number }) => {
  const {
    lockedInsertNumber,
    insertNumber,
    deleteNumber,
    setLockedInsertNumber
  } = useGameStore((state) => state)

  const bindLongPress = useLongPress(() => {
    setLockedInsertNumber(number ?? null)
  })

  function handleClick() {
    if (lockedInsertNumber) {
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
      {number ?? 'X'}
    </button>
  )
}

export default NumberPadButton
