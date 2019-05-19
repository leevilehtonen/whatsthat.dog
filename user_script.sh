#!/bin/bash
cd home/ec2-user/
mkdir projects
cd projects
git clone https://github.com/leevilehtonen/whatsthat.dog.git
cd whatsthat.dog
sudo chmod +x run.sh
mkdir data
mkdir models
mkdir logs
cd ..
sudo chown -R ec2-user:ec2-user whatsthat.dog/
