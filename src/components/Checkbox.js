import React from 'react'

function Checkbox({handleLanded, landed}) {


  return (
    <div>
    <input className="mr-1" type="checkbox" checked={landed} onClick={()=>handleLanded()}/>
    <span className="mr-3 justify-content-start align-content-start" style={{color: "white"}}>Landed</span>
    </div>
  )
}

export default Checkbox


