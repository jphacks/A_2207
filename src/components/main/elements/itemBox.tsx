import React from 'react'

const ItemBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        padding: '1em',
        fontWeight: 'bold',
        background: '#ffffffa0',
        border: 'solid 2px #ffffff',
        borderRadius: '10px',
        position: 'relative',
        minWidth: '300px',
      }}
    >
      {children}
    </div>
  )
}
export default ItemBox
