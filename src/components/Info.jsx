import React from 'react'

function Info(props) {
  return (
    <h1 className='flex self-center mt-10 text-lg'>
        {props.text}
    </h1>
  )
}

export default Info