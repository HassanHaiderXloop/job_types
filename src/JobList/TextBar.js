import React from 'react'
import styled from './jobType.module.css'

function TextBar() {
  return (
    <>
    <section className={styled.heading} > Create Job Type</section>
    <div className={styled.textbox}>
        <input className={styled.text} type={styled.textbar}/>
        <button className={styled.button}>Add</button>
    </div>
    </>
  )
}

export default TextBar

