import React from 'react'
import '../Exercise.css'
import {Container} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

export default function Exercise() {

  const location = useLocation();
  const level = location.state?.level;

  return (
      <Container className='Container'>
        <div className='VideoPart'></div>
        <div className='Word'></div>
        <div className='ImagePlace'></div>
    </Container>
  )
}
