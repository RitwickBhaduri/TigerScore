#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p icons

# Download the original SVG
curl -o icons/icon.svg "https://app.trickle.so/storage/public/images/usr_0edcd6d6a0000001/62b82d8d-219e-47d6-860d-ab8c5ba55d4a.svg"

# Generate different sizes
sizes=(72 96 128 144 152 192 384 512)

for size in "${sizes[@]}"; do
    convert -background none -size ${size}x${size} icons/icon.svg icons/icon-${size}x${size}.png
done 