import React from 'react'
import Circle from './Circle'

function Board({ circles, onCircleClick }) {
  return (
    <div className="board">
      {circles.map((c) => (
        <Circle key={c.id} id={c.id} top={c.top} left={c.left} onClick={onCircleClick} />
      ))}
    </div>
  )
}

export default Board
