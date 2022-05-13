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
        {isCandidatesMode ? (
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
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        ) : (
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default NumberPadMobile
