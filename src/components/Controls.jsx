import React from 'react'

function Controls({ pointCount, setPointCount, status, onAction, autoPlay, toggleAutoPlay }) {
  const playing = status === 'playing'
  return (
    <div className="controls">
      <label>
        Points:{' '}
        <input
          type="number"
          min="1"
          value={pointCount}
          onChange={(e) => setPointCount(parseInt(e.target.value))}
          disabled={playing}
        />
      </label>
      <button onClick={onAction}>{playing ? 'Restart' : 'Play'}</button>
      {playing && (
        <button onClick={toggleAutoPlay}>
          Auto Play: {autoPlay ? 'ON' : 'OFF'}
        </button>
      )}
    </div>
  )
}

export default Controls
