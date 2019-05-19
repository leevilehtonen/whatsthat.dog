#!/bin/bash
source activate tensorflow_p36
cd ~/projects/whatsthat.dog/data
wget http://vision.stanford.edu/aditya86/ImageNetDogs/images.tar
wget http://vision.stanford.edu/aditya86/ImageNetDogs/annotation.tar
tar xvf images.tar
tar xvf annotation.tar
cd ..
source activate tensorflow_p36
pip install -r requirements.txt
python main_optimizer.py
aws s3 sync logs s3://ai-data-storage/logs
aws s3 sync models s3://ai-data-storage/models
echo "SUCCESS"