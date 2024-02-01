import '../Exercise.css';
import { Container, Button } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function Exercise() {

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [randomWord, setRandomWord] = useState();
  const [countdown, setCountdown] = useState(3); // Add this line

  const getRandomWord = (wordsArray) => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
  };

  useEffect(() => {
    // Replace the fetch with a hardcoded array (for testing purposes)
    
  }, []);

  // useEffect(() => {
  //   const loadTensorFlow = async () => {
  //     await tf.ready();
  //     loadAndPredict();
  //   };

  //   loadTensorFlow();
  // }, []);

  // async function loadAndPredict(image) {
  //   // Import TensorFlow.js
  //   const tf = require('@tensorflow/tfjs');

  //   // Your TensorFlow.js code goes here
  //   const model = await tf.loadLayersModel('/public/model.onnx');

  //   // Example input data (adjust based on your model input shape)
  //   const inputData = tf.tensor2d(image);

  //   // Make predictions
  //   const predictions = model.predict(inputData);

  //   // Display predictions
  //   predictions.print();
  // }

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

      // loadAndPredict(ImageData)
    }
    else {
      console.warn('Video not ready or not loaded');
    };
  }
  useEffect(() => {
    const hardcodedWords = [
      'Hello',
      'Goodbye',
      'Thank you',
      'Sorry',
      'Please',
      'Help',
      'Yes',
      'No',
      'Love',
      'Family',
      'Friend',
      'Eat',
      'Drink',
      'Sleep',
      'Work',
      'Play',
      'Learn',
      'Fun',
      'Beautiful',
      'Home'
    ];

    // Get a random word from the hardcoded array
    const word = getRandomWord(hardcodedWords);

    // Set the random word in the state
    setRandomWord(word);
    
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
  const formData = new FormData();
  formData.append('image', capturedImage );

  fetch('http://localhost:', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server:', data);
      // Handle the response data here
    })
    .catch(error => {
      console.error('Error:', error);
    });
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

    </Container>
  );
}

