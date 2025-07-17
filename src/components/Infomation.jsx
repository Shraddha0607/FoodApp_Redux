import React from 'react'

function Infomation({title, info1, info2}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{info1}</p>
      <p>{info2}</p>
      <button className='button'>Okay</button>
    </div>
  )
}

export default Infomation
