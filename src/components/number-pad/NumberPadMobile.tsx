import classNames from 'classnames'
import { FunctionComponent } from 'react'
import useGameStore from '../../store/game'
import NumberPadButton from './NumberPadButton'

const NumberPadMobile: FunctionComponent = () => {
  const { isCandidatesMode, toggleIsCandidatesMode } = useGameStore(
    (state) => state
  )

  return (
    <div className="gap-2 md:gap-4 grid grid-cols-6 w-full justify-between">
      <div className="gap-2 md:gap-4 grid grid-cols-1 place-content-between">
        <NumberPadButton number={1} />
        <NumberPadButton number={2} />
      </div>
      <div className="gap-2 md:gap-4 grid grid-cols-1 place-content-between">
        <NumberPadButton number={3} />
        <NumberPadButton number={4} />
      </div>
      <div className="gap-2 md:gap-4 grid grid-cols-1 place-content-between">
        <NumberPadButton number={5} />
        <NumberPadButton number={6} />
      </div>
      <div className="gap-2 md:gap-4 grid grid-cols-1 place-content-between">
        <NumberPadButton number={7} />
        <NumberPadButton number={8} />
      </div>
      <div className="gap-2 md:gap-4 grid grid-cols-1 place-content-between">
        <NumberPadButton number={9} />
        <NumberPadButton />
      </div>
      <div
        onClick={toggleIsCandidatesMode}
        className={classNames(
          'flex justify-center items-center rounded-xl text-lg md:text-3xl shadow-lg',
          isCandidatesMode ? 'bg-white' : 'bg-blue-500 text-white'
        )}
      >
        {isCandidatesMode ? 'C' : 'N'}
      </div>
    </div>
  )
}

export default NumberPadMobile
