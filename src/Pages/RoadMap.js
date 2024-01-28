import React from 'react';
import { Container, Image } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import '../RoadMap.css'; // Make sure you have this CSS file in your project

export default function RoadMap() {
  const navigate = useNavigate();
  const navigateToLevel = (level) => {
    navigate('/exercise', { state: { level } });
  };
  return (
    <Container className="roadmap-container">
      <Image className="roadmap-image" src=".\images\Roadmap.png" alt="Roadmap" />
      <div className="roadmap-items">
        {/* Buttons and numbers would be placed here */}
        <div className="level-button level-1" onClick={()=>navigateToLevel(1)}>1</div>
        <div className="level-button level-2" onClick={()=>navigateToLevel(2)}>2</div>
        <div className="level-button level-3" onClick={()=>navigateToLevel(3)}>3</div>
        <div className="level-button level-4" onClick={()=>navigateToLevel(4)}>4</div>
        <div className="level-button level-5" onClick={()=>navigateToLevel(5)}>5</div>
      </div>
    </Container>
  );
}
