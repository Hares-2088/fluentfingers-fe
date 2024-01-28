import React from 'react'
import { Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../RoadMap.css';

export default function RoadMap() {
  return (
    <Container className='Container'>
      <div>
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
    <img style={{width: 390, height: 769, left: 0, top: 769, position: 'absolute'}} src="https://via.placeholder.com/390x769" />
    <div style={{width: 171, height: 613.74, left: 108, top: 77.63, position: 'absolute'}}>
        <div style={{width: 171, height: 613.74, left: 0, top: 0, position: 'absolute'}}>
            <div style={{width: 78, height: 71.24, left: 0, top: 0, position: 'absolute', background: '#F6A6C2', borderRadius: 9999}} />
            <div style={{width: 78, height: 71.24, left: 93, top: 137.91, position: 'absolute', background: '#FFE786', borderRadius: 9999}} />
            <div style={{width: 78, height: 71.24, left: 0, top: 271.25, position: 'absolute', background: '#9AE8A7', borderRadius: 9999}} />
            <div style={{width: 78, height: 71.24, left: 93, top: 404.59, position: 'absolute', background: '#8AABFF'}}></div>
            <div style={{width: 78, height: 71.24, left: 0, top: 542.50, position: 'absolute', background: '#CC8AFF'}}></div>
        </div>
        <div style={{width: 40, height: 28.31, left: 19, top: 21.92, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 40, fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word'}}>1</div>
        <div style={{width: 40, height: 28.31, left: 112, top: 159.83, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 40, fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word'}}>2</div>
        <div style={{width: 40, height: 28.31, left: 19, top: 292.26, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 40, fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word'}}>3</div>
        <div style={{width: 40, height: 28.31, left: 112, top: 425.60, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 40, fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word'}}>4</div>
        <div style={{width: 40, height: 28.31, left: 19, top: 563.51, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 40, fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word'}}>5</div>
    </div>
</div>
       </div>
    </Container>
  
  )
}
