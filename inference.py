import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import numpy as np

# Load the model from the HDF5 file
h5_model = load_model('asl_trained_model.h5')

# Load and preprocess the input image
img_path = 'A.jpg'
img = image.load_img(img_path, target_size=(50, 50))  # Adjust target size based on your model's input size (50 x 50)
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0  # Normalize the image data

# Make predictions
predictions = h5_model.predict(img_array)


max_value = np.max(predictions[0])
max_index = np.where(predictions[0] == max_value)[0]
print(chr(int(max_index) + 64))

"""
max_value = max(predictions[0])
# Find the index of the maximum value
max_index = predictions[0].index(max_value)"""

print(max_value)
print(max_index)


# Display or use the prediction result
#print("Predictions:", predictions)
