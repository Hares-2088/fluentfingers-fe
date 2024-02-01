# app.py from chatgpt

# TO RUN
# Do npm run build in the /frontend in one terminal
# Then open another terminal and do flask run in /backend


from flask import Flask, send_from_directory, request, jsonify
from werkzeug.utils import secure_filename

import cv2 as cv
from mediapipe import solutions as mp
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import math

from flask_cors import CORS  # Import the CORS extension

import base64
from io import BytesIO



app = Flask(__name__, static_url_path='', static_folder='../frontend/build')
CORS(app)  # Enable CORS for all routes


# Load the model as a global variable
loaded_model = None

def get_model():
    global loaded_model
    # Implement your model loading logic here
    loaded_model = load_model('final_model.h5')

# Call the load_model function when the application starts
get_model()



# Serve the React build for all routes except /api/upload
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
  if path != 'api/upload':
    return send_from_directory('../frontend/build', 'index.html')
  else:
     return "API Upload Route"


@app.route('/api/upload', methods=['POST'])
def upload_file():
  try:
    # Get the image data and correct letter from the request
    data = request.json
    image_data = data.get('image')
    correct_letter = data.get('letter')

    # Decode the image from base64-encoded JPEG to an opencv image
    decoded_image = base64_to_cv2(image_data)
    # Preprocess image
    input_image = preprocess_image(decoded_image)
    # Makes predictions and returns an array of top 3 results
    predictions = make_prediction(input_image)

    # Determine whether they predicted the correct letter
    result = correct_letter in predictions

    print(result)
    print("Correct Letter:")
    print(correct_letter)

    # Return the result as JSON
    return jsonify({'result': result})

  except Exception as e:
    return jsonify({'error': str(e)})


# Decode the input to a cv image
def base64_to_cv2(base64_data):
  # Remove the 'data:image/jpeg;base64,' prefix
  base64_data = base64_data.split(',')[1]
  
  # Decode the base64 data
  binary_data = base64.b64decode(base64_data)
  
  # Convert to a NumPy array
  image_array = np.frombuffer(binary_data, dtype=np.uint8)
  
  # Read the image using OpenCV
  image_cv2 = cv.imdecode(image_array, cv.IMREAD_COLOR)
  
  return image_cv2


# Input a preprocessed image and output the top 3 predictions of the model
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
  # Return the top 3 items
  top_3_items = sorted_items[:3]
  letters = [key for key, _ in top_3_items]
  print(letters)
  return letters


# Input a cv image and output a cropped img array to test the model
def preprocess_image(image):
  hands = mp.hands.Hands()

  # Convert the image to RGB format
  image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)

  # Find Coordinates of landmarks
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

  # Calculate box dimensions
  left = int(mean_x - furthest_distance - 10)
  top = int(mean_y - furthest_distance - 10)
  right = int(mean_x + furthest_distance + 10)
  bottom = int(mean_y + furthest_distance + 10)

  # Crop the image
  cropped_image = image[top:bottom, left:right]

  # Resize the image
  resized_image = cv.resize(cropped_image, (50, 50))

  # Convert to Array
  img_array = np.expand_dims(resized_image, axis=0)

  # Normalize pixel values from 0 to 1
  img_array = img_array / 255.0

  return img_array

  
if __name__ == '__main__':
  app.run(debug=True, port=5000)



### Currently: React server works, but flask app.py is returning undefined as the result?
  #TODO: FIx that