import numpy as np
import tensorflow as tf
from keras import backend as K
from backend import root_dir
from tensorflow.keras.layers import (ReLU)

__all__ = ['YeNet']

srm_weights = np.load(str(root_dir / 'backend/res/SRM_Kernels.npy'))
biasSRM = np.ones(30)
T3 = 3

def Tanh3(x):
    tanh3 = K.tanh(x) * T3
    return tanh3

#def Ye_Net(img_size=256):
class YeNet():
    def __init__(self, img_size=256):
        tf.keras.backend.clear_session()
        # Preprocessing
        #inputs = tf.keras.Input(shape=(img_size, img_size, 1), name="input_1")
        # tf.keras.backend.clear_session()

        # Inputs
        inputs = tf.keras.Input(shape=(img_size, img_size, 1), name="input_1")

        # Block 1
        layers = tf.keras.layers.Conv2D(30, (5, 5), weights=[srm_weights, biasSRM], strides=(1, 1), trainable=False,
                                        activation=Tanh3, use_bias=True)(inputs)


        # Block 2

        layers = tf.keras.layers.Conv2D(30, (3, 3), strides=(1, 1), kernel_initializer='glorot_normal',
                                        kernel_regularizer=tf.keras.regularizers.l2(0.0001),
                                        bias_regularizer=tf.keras.regularizers.l2(0.0001))(layers)
        layers = ReLU(negative_slope=0.1, threshold=0)(layers)
        layers = tf.keras.layers.Lambda(tf.keras.backend.abs)(layers)
        layers = tf.keras.layers.BatchNormalization(momentum=0.2, epsilon=0.001, center=True, scale=False, trainable=True,
                                                    fused=None, renorm=False, renorm_clipping=None, renorm_momentum=0.4,
                                                    adjustment=None)(layers)
        layers = tf.keras.layers.Concatenate()([layers, layers, layers])

        # Block 3
        layers = tf.keras.layers.SpatialDropout2D(rate=0.1)(layers)
        layers = tf.keras.layers.Conv2D(30, (3, 3), strides=(1, 1), kernel_initializer='glorot_normal',
                                        kernel_regularizer=tf.keras.regularizers.l2(0.0001),
                                        bias_regularizer=tf.keras.regularizers.l2(0.0001))(layers)
        layers = ReLU(negative_slope=0.1, threshold=0)(layers)
        layers = tf.keras.layers.Lambda(tf.keras.backend.abs)(layers)
        layers = tf.keras.layers.BatchNormalization(momentum=0.2, epsilon=0.001, center=True, scale=False, trainable=True,
                                                    fused=None, renorm=False, renorm_clipping=None, renorm_momentum=0.4,
                                                    adjustment=None)(layers)

        # Block 4
        layers = tf.keras.layers.SpatialDropout2D(rate=0.1)(layers)
        layers = tf.keras.layers.Conv2D(30, (3, 3), strides=(1, 1), kernel_initializer='glorot_normal',
                                        kernel_regularizer=tf.keras.regularizers.l2(0.0001),
                                        bias_regularizer=tf.keras.regularizers.l2(0.0001))(layers)
        layers = ReLU(negative_slope=0.1, threshold=0)(layers)
        layers = tf.keras.layers.Lambda(tf.keras.backend.abs)(layers)
        layers = tf.keras.layers.BatchNormalization(momentum=0.2, epsilon=0.001, center=True, scale=False, trainable=True,
                                                    fused=None, renorm=False, renorm_clipping=None, renorm_momentum=0.4,
                                                    adjustment=None)(layers)
        layers = tf.keras.layers.AveragePooling2D((2, 2), strides=(2, 2))(layers)

        # Block 5
        layers = tf.keras.layers.SpatialDropout2D(rate=0.1)(layers)
        layers = tf.keras.layers.Conv2D(32, (5, 5), strides=(1, 1), kernel_initializer='glorot_normal',
                                        kernel_regularizer=tf.keras.regularizers.l2(0.0001),
                                        bias_regularizer=tf.keras.regularizers.l2(0.0001))(layers)
        layers = ReLU(negative_slope=0.1, threshold=0)(layers)
        layers = tf.keras.layers.Lambda(tf.keras.backend.abs)(layers)
        layers = tf.keras.layers.BatchNormalization(momentum=0.2, epsilon=0.001, center=True, scale=False, trainable=True,
                                                    fused=None, renorm=False, renorm_clipping=None, renorm_momentum=0.4,
                                                    adjustment=None)(layers)

        # Block 6
        layers = tf.keras.layers.Concatenate()([layers, layers, layers])
        layers = tf.keras.layers.GlobalAveragePooling2D(data_format="channels_last")(layers)
        layers = tf.keras.layers.Dense(128, kernel_initializer='glorot_normal',
                                    kernel_regularizer=tf.keras.regularizers.l2(0.0001),
                                    bias_regularizer=tf.keras.regularizers.l2(0.0001))(layers)
        layers = ReLU(negative_slope=0.1, threshold=0)(layers)
        layers = tf.keras.layers.Dense(64, kernel_initializer='glorot_normal',
                                    kernel_regularizer=tf.keras.regularizers.l2(0.0001),
                                    bias_regularizer=tf.keras.regularizers.l2(0.0001))(layers)
        layers = ReLU(negative_slope=0.1, threshold=0)(layers)
        layers = tf.keras.layers.Dense(32, kernel_initializer='glorot_normal',
                                    kernel_regularizer=tf.keras.regularizers.l2(0.0001),
                                    bias_regularizer=tf.keras.regularizers.l2(0.0001))(layers)
        layers = ReLU(negative_slope=0.1, threshold=0)(layers)
        predictions = tf.keras.layers.Dense(2, kernel_initializer='glorot_normal', activation="softmax", name="output_1",
                                            kernel_regularizer=tf.keras.regularizers.l2(0.0001),
                                            bias_regularizer=tf.keras.regularizers.l2(0.0001))(layers)
        # Model generation
        self.model = tf.keras.Model(inputs=inputs, outputs=predictions)
        # Optimizer
        optimizer = tf.keras.optimizers.SGD(learning_rate=0.005, momentum=0.95)  # lrate
        # Compilator
        self.model.compile(optimizer=optimizer, loss='binary_crossentropy', metrics=['accuracy'])

    def load_weights(self, path: str) -> None:
        self.model.reset_states()
        self.model.load_weights(path)

    def evaluate(self, X_test, Y_test, verbose=None):
        out = self.model.evaluate(X_test, Y_test)
        return out

    def __call__(self, img: np.ndarray):
        # print("img.shape",img.shape)
        assert len(img.shape) == 2, 'input should be gray image'
        w, h = img.shape
        img = img.reshape(1, w, h, 1)
        out = self.model.predict(img)
        return out

