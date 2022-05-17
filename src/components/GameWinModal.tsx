import confetti from 'canvas-confetti'
import classNames from 'classnames'
import { FunctionComponent, useEffect, useState } from 'react'
import trophyImg from '../assets/images/trophy.png'
import GameResetButton from './GameResetButton'

const defaultConfettiConfig = {
  particleCount: 50,
  spread: 50,
  decay: 0.97,
  ticks: 500
}

const leftConfettiConfig = {
  ...defaultConfettiConfig,
  angle: 65,
  origin: { x: 0, y: 1 }
}

const rightConfettiConfig = {
  ...defaultConfettiConfig,
  angle: 115,
  origin: { x: 1, y: 1 }
}

function confettiCannon(configs: any) {
  confetti({
    ...configs,
    scalar: 0.8
  })
  confetti({
    ...configs,
    gravity: 1.25
  })
  confetti({
    ...configs,
    gravity: 1.5,
    scalar: 1.2
  })
}

const GameWinModal: FunctionComponent = () => {
  const [showDiv, setShowDiv] = useState(false)

  useEffect(() => {
    confettiCannon(leftConfettiConfig)
    confettiCannon(rightConfettiConfig)

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
        <img src={trophyImg} alt="trophy" className="w-1/3 mx-auto" />
        <h1 className="text-blue-500 text-3xl font-bold text-center mt-3">
          Congratulazioni!
        </h1>

        <p className="py-3 text-lg text-center">Hai risolto il sudoku!</p>

        <GameResetButton />
      </div>
    </div>
  )
}

export default GameWinModal
