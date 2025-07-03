import { useState, useEffect } from 'react'
import './Game.css'
import Controls from './components/Controls'
import Board from './components/Board'

function App() {
  const [pointCount, setPointCount] = useState()
  const [circles, setCircles] = useState([]) // {id, top, left}
  const [nextExpected, setNextExpected] = useState(1)
  const [status, setStatus] = useState('idle') // idle | playing | won | lost
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0) // milliseconds
  const [autoPlay, setAutoPlay] = useState(false)

  // Timer update
  useEffect(() => {
    let id
    if (status === 'playing') {
      id = setInterval(() => {
        setElapsed(Date.now() - startTime)
      }, 10)
    }
    return () => clearInterval(id)
  }, [status, startTime])

  // Auto play effect
  useEffect(() => {
    if (!autoPlay || status !== 'playing') return
    const id = setInterval(() => {
      handleCircleClick(nextExpected)
    }, 500)
    return () => clearInterval(id)
  }, [autoPlay, status, nextExpected])

  const randomPos = () => ({
    top: Math.random() * 90, // percentage values
    left: Math.random() * 90,
  })

  const startGame = () => {
    setAutoPlay(false)
    if (pointCount <= 0) return
    const pts = Array.from({ length: pointCount }, (_, i) => ({
      id: i + 1,
      ...randomPos(),
    }))
    setCircles(pts)
    setNextExpected(1)
    setStatus('playing')
    setStartTime(Date.now())
    setElapsed(0)
  }

  const restart = () => {
    setAutoPlay(false)
    setStatus('idle')
    setCircles([])
    setNextExpected(1)
    setElapsed(0)
  }

  const toggleAutoPlay = () => setAutoPlay((prev) => !prev)

  const handleCircleClick = (id) => {
    if (status !== 'playing') return
    if (id === nextExpected) {
      if (id === pointCount) {
        // last correct
        setCircles([])
        setStatus('won')
      } else {
        setCircles((prev) => prev.filter((c) => c.id !== id))
        setNextExpected(id + 1)
      }
    } else {
      setStatus('lost')
    }
  }

  return (
    <>
      <h1>
        {status === 'won'
          ? 'ALL CLEARED'
          : status === 'lost'
          ? 'GAME OVER'
          : "LET'S PLAY"}
      </h1>

      <Controls
        pointCount={pointCount}
        setPointCount={setPointCount}
        status={status}
        onAction={status === 'playing' ? restart : startGame}
        autoPlay={autoPlay}
        toggleAutoPlay={toggleAutoPlay}
      />



      <p>Time: {(elapsed / 1000).toFixed(2)}s</p>

      <Board circles={circles} onCircleClick={handleCircleClick} />
    </>
  )
}

export default App
