# Converts .h5 model to .onnx model
# We learned to do this file conversion mostly from ChatGPT


import tensorflow as tf
import tf2onnx

import sys

h5_model_path = sys.argv[1]
# Load the Keras model from HDF5
h5_model = tf.keras.models.load_model(h5_model_path)

# Convert the Keras model to ONNX format
onnx_model, _ = tf2onnx.convert.from_keras(h5_model)

onnx_model_path = sys.argv[2]
# Save the ONNX model to a file
with open(onnx_model_path, 'wb') as f:
    f.write(onnx_model.SerializeToString())
