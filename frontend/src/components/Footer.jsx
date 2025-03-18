import React from 'react'

const Footer = () => {
  return (
    <div style={footerStyles}>
        <span>This is footer information</span>
        <span>This is footer information</span>
        <span>This is footer information</span>
    </div>
  )
}

export default Footer

const footerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff'
}