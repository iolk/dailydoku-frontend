import classNames from 'classnames'
import { FunctionComponent, useEffect, useState } from 'react'
import GameResetButton from './GameResetButton'

const GameInitModal: FunctionComponent = () => {
  const [showDiv, setShowDiv] = useState(false)

  useEffect(() => {
    setShowDiv(true)
  })

  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-30 flex bg-slate-800/30 items-center justify-center">
      <div
        className={classNames(
          'transition duration-300 bg-clip-padding shadow-lg backdrop-filter backdrop-blur-sm bg-white/60 sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-5 rounded-2xl p-5',
          showDiv ? 'scale-100' : 'scale-0'
        )}
      >
        <img
          src="/android-chrome-512x512.png"
          alt="trophy"
          className="w-1/3 mx-auto"
        />
        <h1 className="text-blue-500 text-3xl font-bold text-center mt-3">
          Benvenuto su DailyDoku!
        </h1>

        <p className="py-3 text-lg text-center">
          Scegli la difficoltà del sudoku e inizia a giocare!
        </p>

        <GameResetButton />
      </div>
    </div>
  )
}

export default GameInitModal
