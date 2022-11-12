import React from 'react'

const ItemBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        padding: '1em',
        fontWeight: 'bold',
        background: '#ffffff99',
        borderRadius: '10px',
        position: 'relative',
        backdropFilter: 'blur(3px)',
      }}
    >
      {children}
    </div>
  )
}
export default ItemBox
