import '../Exercise.css';
import { Container, Button } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';

import {testModel, make_prediction, preprocess_image} from '../../../backend/test.py'

export default function Exercise() {

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [randomLetter, setRandomLetter] = useState();
  const [countdown, setCountdown] = useState(3); // Add this line

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

  const takePicture = (correct_letter) => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Get the image data as a base64-encoded PNG
      const imageData = context.canvas.toDataURL('image/jpg');
      console.log('Image Data:', imageData);

      // Store the image data in the component state
      console.log('Canvas dimensions:', canvas.width, canvas.height);
      console.log('Image Data:', imageData);
      setCapturedImage(imageData);

      // Call the testModel function with the captured image
      testModel(imageData, correct_letter)
        .then(response => response.json())
        .then(data => {
          console.log('Model testing result:', data.result);
          // Handle the result as needed
          // TODO: Insert a block saying that they have either won or lost
          // Determine if the user is correct based on the result
          const userIsCorrect = data.result;
          setIsCorrect(userIsCorrect);
        })
        .catch(error => {
          console.error('Error testing model:', error);
        });
    
    }
    else {
      console.warn('Video not ready or not loaded');
    };
  }
  useEffect(() => {

    // Get a random word from the hardcoded array
    const letter = getRandomLetter();

    // Set the random word in the state
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
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }
    startVideo();
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', handleLoadedData);
      }
      clearInterval(countdownIntervalRef.current);
      // Cleanup: stop the video stream when the component unmounts
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  // Assume 'file' is the File object representing the selected image
  // const formData = new FormData();
  // formData.append('image', capturedImage );

  // fetch('http://localhost:', {
  //   method: 'POST',
  //   body: formData,
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Response from server:', data);
  //     // Handle the response data here
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // Load and make predictions when the script is executed
  // loadAndPredict();

  return (
    <Container className='Container'>
      <div className='portraitDiv'>
        <video ref={videoRef} autoPlay playsInline muted className='videoElement' />
      </div>

      <div className='Word my-3' style={{ height: '4vh' }}>
        {randomWord && <p>{randomWord}</p>}
      </div>

      <div style={{ width: '30%', height: '35%' }}>
        {capturedImage && <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%' }} />}
      </div>

      <div>
        <Button onClick={startVideo} className='Button'>Take the photo</Button>
      </div>

      <div>
        {/* Conditionally render a block based on the correctness */}
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

