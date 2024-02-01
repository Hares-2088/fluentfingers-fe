import os

import cv2 as cv
from mediapipe import solutions as mp
import numpy as np
import onnxruntime as ort
from tensorflow.keras.models import load_model
from PIL import Image
import math

import jsonify

def testModel(image, letter):
  # Load model
  model = load_model('../backend/final_model.h5')
  # Preprocess image (Assume image is a jpg)
  input_image = preprocess_image(image)
  # Makes predictions and returns an array of top 3 results
  predictions = make_prediction(input_image)

  # convert letter to uppercase
  correct_letter = letter.upper()
  # Determine whether they predicted the correct letter
  result = correct_letter.upper() in predictions

  return jsonify({'result': result})


def make_prediction(input_image):
  # Load model
  model = load_model('final_model.h5')
  # Get scores
  predictions = model.predict(input_image)
  # Map the scores to a letter
  map_characters = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z', 26: 'del', 27: 'nothing', 28: 'space'}
  combined_dict = dict(zip(map_characters.values(), predictions[0]))
  # Sort
  sorted_items = sorted(combined_dict.items(), key=lambda x: x[1], reverse=True)

  # Return the top 3 letters (uppercase)
  top_3_items = sorted_items[:3]
  letters = [key for key, _ in top_3_items]

  return letters


def preprocess_image(image):
  hands = mp.hands.Hands()

  # Convert the image to RGB format
  image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)

  try:
    results = hands.process(image_rgb)
    if results.multi_hand_landmarks:
      x_values = []  # List to store X values of landmarks
      y_values = []
      for hand_landmarks in results.multi_hand_landmarks:
        for landmark_id, landmark in enumerate(hand_landmarks.landmark):
          # Extracting X, Y, Z coordinates of each landmark
          x = int(landmark.x * image.shape[1])
          x_values.append(x)
          y = int(landmark.y * image.shape[0])
          y_values.append(y)
          z = landmark.z  # Z coordinate may not be available in all cases

  except Exception as err:
      print(f"Error processing the image: {err}")

  mean_x = sum(x_values) / len(x_values)
  mean_y = sum(y_values) / len(y_values)

  furthest_distance = 0
  for x, y in zip(x_values, y_values):
      distance = math.sqrt((x - mean_x)**2 + (y - mean_y)**2)
      furthest_distance = max(furthest_distance, distance)

  # Calculate bounding box dimensions
  left = int(mean_x - furthest_distance - 10)
  top = int(mean_y - furthest_distance - 10)
  right = int(mean_x + furthest_distance + 10)
  bottom = int(mean_y + furthest_distance + 10)

  # Crop the image
  cropped_image = image[top:bottom, left:right]

  # Resize the image
  resized_image = cv.resize(image, (50, 50))

  # Convert to Array
  img_array = np.expand_dims(resized_image, axis=0)

  # Normalize pixel values from 0 to 1
  img_array = img_array / 255.0

  return img_array

  
if __name__ == '__main__':
  app.run(debug=True)
