import React from 'react'

function Header() {
  return (
    <div className="bg-gray-800 p-2 flex justify-center">
        <img src="/logo.svg" width="80" height="80" alt="bitcoin logo"/>
        <h1 className="text-orange-300 font-mono text-3xl m-10">Bitcoin Information</h1>
    </div>
  )
}

export default Header