#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p icons

# Array of sizes to generate
sizes=(72 96 128 144 152 192 384 512)

# Generate regular icons
for size in "${sizes[@]}"; do
    convert icons/icon.svg -resize ${size}x${size} icons/icon-${size}x${size}.png
done

# Generate maskable icons (with padding)
convert icons/icon.svg -resize 180x180 -background none -gravity center -extent 192x192 icons/icon-maskable-192x192.png
convert icons/icon.svg -resize 480x480 -background none -gravity center -extent 512x512 icons/icon-maskable-512x512.png 