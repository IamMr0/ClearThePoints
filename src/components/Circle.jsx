import React from 'react'

function Circle({ id, top, left, onClick }) {
  return (
    <div
      className="circle"
      style={{ top: `${top}%`, left: `${left}%` }}
      onClick={() => onClick(id)}
    >
      {id}
    </div>
  )
}

export default Circle
