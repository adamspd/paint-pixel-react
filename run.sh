#!/usr/bin/env bash

# This script is used to build the application and deploy it.
npm config set legacy-peer-deps true;
npm install;
npm run build && rm -rf /home/debian/paintpixel/html;
cp -r /home/debian/paintpixel/code/paint-pixel-react/build/* /home/debian/paintpixel/html
sudo service nginx restart