import '../Exercise.css';
import { Container } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';

export default function Exercise() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const [countdown, setCountdown] = useState(3);
  const [capturedImage, setCapturedImage] = useState(null);

  const getCameraStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
};

  const startVideo = () => {
    if (!streamRef.current) {
      getCameraStream();
    }
    setCountdown(3); // Reset the countdown when starting the video
  };

  const takePicture = () => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Get the image data as a base64-encoded PNG
      const imageData = context.canvas.toDataURL('image/png');
      console.log('Image Data:', imageData);

      // Store the image data in the component state
      console.log('Canvas dimensions:', canvas.width, canvas.height);
      console.log('Image Data:', imageData);
      setCapturedImage(imageData);

    } else {
      console.warn('Video not ready or not loaded');
    }
  };

  useEffect(() => {
    const handleLoadedData = () => {
      console.log('Video loaded data');
      clearInterval(countdownIntervalRef.current);

      // Wait a brief moment before taking the picture to ensure the video is ready
      setTimeout(() => {
        takePicture();
      }, 1000);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', handleLoadedData);
    }

    if (countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', handleLoadedData);
      }
      clearInterval(countdownIntervalRef.current);
      // Cleanup: stop the video stream when the component unmounts
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  return (
    <Container className='Container'>
      <div className='portraitDiv'>
        <video ref={videoRef} autoPlay playsInline muted className='videoElement'/>
      </div>
      <div className='Word'></div>

      <div>
        {capturedImage && <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%' }} />}
      </div>

      <div>
        <button onClick={startVideo}>Take the photo</button>
      </div>
      <div>
        {countdown > 0 ? <p>Countdown: {countdown}</p> : <p>Capture the picture!</p>}
      </div>
    </Container>
  );
}
