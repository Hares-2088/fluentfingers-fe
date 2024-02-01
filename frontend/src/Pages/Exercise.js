import '../Exercise.css';
import { Container, Button } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';


export default function Exercise() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [randomLetter, setRandomLetter] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [countdown, setCountdown] = useState(3);

  const getRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };

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

  const takePicture = async (correctLetter) => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      // Prepares canvas to save image onto
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      // Captures image
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Change image so it is presentable

      // Get the image data as a base64-encoded JPG
      const imageData = context.canvas.toDataURL('image/jpeg');

      // Store the image data in the component state
      setCapturedImage(imageData);

      try {
        // Make an HTTP request to the Flask API endpoint where testModel is exposed
        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageData, letter: correctLetter }),
        });

        const data = await response.json();

        console.log(data)

        console.log('Model testing result:', data.result);
        // Handle the result as needed
        setIsCorrect(data.result);
      } catch (error) {
        console.error('Error testing model:', error);
      }
    } else {
      console.warn('Video not ready or not loaded');
    }
  };

  useEffect(() => {
    const letter = getRandomLetter();
    setRandomLetter(letter);

    const handleLoadedData = () => {
      console.log('Video loaded data');
      clearInterval(countdownIntervalRef.current);

      // Wait a brief moment before taking the picture to ensure the video is ready
      setTimeout(() => {
        takePicture(letter);
      }, 1000);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', handleLoadedData);
    }

    if (countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    startVideo();
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', handleLoadedData);
      }
      clearInterval(countdownIntervalRef.current);
    };
  }, []);

  return (
    <Container className='Container'>
      <div className='portraitDiv'>
        <video ref={videoRef} autoPlay playsInline muted className='videoElement' />
      </div>

      <div style={{ width: '50%', height: '50%' }}>
        {capturedImage && <img src={capturedImage} alt='Captured' style={{ width: '100%', height: '100%' }} />}
      </div>

      <div>
        <h2>Correct Letter: {randomLetter}</h2>
      </div>
      <div>
      <Button onClick={startVideo} className='Button'>Start Video</Button>
      </div>
      <div>
      <Button onClick={() => takePicture(randomLetter)} className='Button'>
        Take the photo
      </Button>
      </div>

      <div>
        {isCorrect !== null && (
          <div>
            {isCorrect ? (
              <p>Congratulations! You are correct!</p>
            ) : (
              <p>Oops! You are incorrect.</p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
