import React from 'react'
import '../Challenges.css'
import {Container, Image} from 'react-bootstrap'

export default function Challenges() {
  return (
    <Container className='Container'>
      <h1 className='headerPage'>Challenges</h1>
      <div className='challenge1'>
        <h4>Do 5 games per day</h4>
      </div>
      <div className='challenge2'>
        <h4>Play 5 days in a row</h4>
      </div>
      <div className='challenge3'>
        <h4>Have 3 correct answers in a row</h4>
      </div>
    </Container>
  )
}
