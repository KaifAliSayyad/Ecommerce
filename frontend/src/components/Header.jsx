import React from 'react'

const Header = () => {
  return (
    <div style={headerStyles}>
        <span>GoCart</span>
    </div>
  )
}

export default Header

const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff'
}