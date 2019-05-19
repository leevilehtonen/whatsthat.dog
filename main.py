import re, time, os
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import xml.etree.ElementTree as ET
import PIL
from tqdm import tqdm, tqdm_notebook
from tensorflow.python.keras.preprocessing.image import load_img, img_to_array
from tensorflow.python.keras import Sequential
from tensorflow.python.keras.applications import NASNetMobile
from tensorflow.python.keras.callbacks import TensorBoard, EarlyStopping, ReduceLROnPlateau
from tensorflow.python.keras.layers import Dense, Dropout, Conv2D, MaxPool2D, BatchNormalization, GlobalAveragePooling2D


RANDOM_STATE = 20
NAME = f"dogs_breeds_{int(time.time())}"
IMAGE_WIDTH = 224
IMAGE_HEIGHT = 224
IMAGE_CHANNELS = 3
IMAGE_SIZE = (IMAGE_WIDTH, IMAGE_HEIGHT)
INPUT_SHAPE = (*IMAGE_SIZE, IMAGE_CHANNELS)
BATCH_SIZE = 16
EPOCHS = 40

np.random.seed(RANDOM_STATE)


# Preprocess

foldername_pattern = re.compile(r"n\d{8}-(.*)")

image_paths = []
annotation_paths = []
categories = []
category_names = {}


for index, folder in enumerate(os.listdir("data/Images")):

    category = foldername_pattern.search(folder).groups()[0]
    category_names[index] = category.replace("_", " ").capitalize()

    for item in os.listdir(f"data/Images/{folder}"):

        image_paths.append(f"data/Images/{folder}/{item}")
        annotation_paths.append(f"data/Annotation/{folder}/{item.split('.')[0]}")
        categories.append(index)


df_input = pd.DataFrame({"image_file": image_paths, "annotation_file": annotation_paths, "category": categories})
df_input = df_input.sample(frac=1, random_state=RANDOM_STATE).reset_index(drop=True)


# Load the data
X = []
X_cropped = []
X_flipped = []
y = []

for index, row in tqdm(df_input.iterrows(), total=len(df_input)):

    img = load_img(row["image_file"])
    annotation_tree = ET.parse(row["annotation_file"])
    bndbox = {i.tag: int(i.text) for i in annotation_tree.getroot()[5][4]}

    img_cropped = img.crop((bndbox["xmin"], bndbox["ymin"], bndbox["xmax"], bndbox["ymax"]))
    img_flipped = img_cropped.transpose(PIL.Image.FLIP_LEFT_RIGHT)

    img_cropped = img_cropped.resize(IMAGE_SIZE)
    img_flipped = img_flipped.resize(IMAGE_SIZE)
    img = img.resize(IMAGE_SIZE)

    X.append(img_to_array(img))
    X_cropped.append(img_to_array(img_cropped))
    X_flipped.append(img_to_array(img_flipped))
    y.append(row["category"])


X = np.array(X)
X_cropped = np.array(X_cropped)
X_flipped = np.array(X_flipped)
y = np.array(y)

# Shuffle all data
shuffled_index = np.random.permutation(len(X))
X, X_cropped, X_flipped, y = (array[shuffled_index] for array in [X, X_cropped, X_flipped, y])

# Split each X and Y to test, train and validation accroding to distribution
split_distribution = [int(0.7 * len(X)), int(0.9 * len(X))]
X_splitted, X_cropped_splitted, X_flipped_splitted, y_splitted = (
    np.split(array, split_distribution) for array in [X, X_cropped, X_flipped, y]
)

# Concatenate the repsective stage datasets together by zipping them and then concatenating
X = list(zip(X_splitted, X_cropped_splitted, X_flipped_splitted))
y = list(zip(y_splitted, y_splitted, y_splitted))
X_train, X_validation, X_test = (np.concatenate(array) / 255.0 for array in X)
y_train, y_validation, y_test = (np.concatenate(array) for array in y)

# Shuffle each stage datasets again after concatenation
shuffled_index = np.random.permutation(len(X_train))
X_train = X_train[shuffled_index]
y_train = y_train[shuffled_index]
shuffled_index = np.random.permutation(len(X_validation))
X_validation = X_validation[shuffled_index]
y_validation = y_validation[shuffled_index]
shuffled_index = np.random.permutation(len(X_test))
X_test = X_test[shuffled_index]
y_test = y_test[shuffled_index]

# plt.figure(figsize=(20, 20))  # width, height in inches

# for i in range(len(X_train)):
#     plt.subplot(6, 6, i + 1)
#     plt.title(category_names[y_train[i]])
#     plt.imshow(X_train[i])

# plt.show()

# Define and compile model

base_model = NASNetMobile(weights="imagenet", include_top=False, input_shape=INPUT_SHAPE)

for layer in base_model.layers:
    layer.trainable = False

model = Sequential()
model.add(base_model)
model.add(GlobalAveragePooling2D())
model.add(Dense(1024, activation="relu"))
model.add(Dense(len(category_names), activation="softmax"))
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])


# Define the callbacks

tensorboard_cb = TensorBoard(log_dir=f"logs/{NAME}")
earlystop_cb = EarlyStopping(patience=8)
reducelronplateau_cb = ReduceLROnPlateau(monitor="val_loss", patience=4, verbose=1, factor=0.5, min_lr=0.0000001)


# Train the model

model.fit(
    x=X_train,
    y=y_train,
    validation_data=(X_validation, y_validation),
    epochs=EPOCHS,
    batch_size=BATCH_SIZE,
    callbacks=[tensorboard_cb, earlystop_cb, reducelronplateau_cb],
    verbose=1,
)
model.save(f"models/{NAME}.h5", overwrite=True)

# Score the model

score = model.evaluate(X_test, y_test)
print("Test loss:", score[0])
print("Test accuracy:", score[1])
