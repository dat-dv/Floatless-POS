#!/bin/bash

INPUT="public/data/menu.json"
OUTPUT="public/data/menu-2.json"
IMG_DIR="public/img"

mkdir -p "$IMG_DIR"

# Tạo file output rỗng
echo "[]" > "$OUTPUT"

# Loop từng item
jq -c '.[]' "$INPUT" | while read -r item; do
  id=$(echo "$item" | jq -r '.id')
  image=$(echo "$item" | jq -r '.image')

  # remove query params (optional)
  clean_url=$(echo "$image" | cut -d'?' -f1)

  filename="${id}.jpg"
  filepath="$IMG_DIR/$filename"

  echo "⬇️ Downloading $clean_url"

  curl -s -L "$clean_url" -o "$filepath"

  # update JSON object
  new_item=$(echo "$item" | jq --arg img "/img/$filename" '.image = $img')

  # append vào output
  tmp=$(mktemp)
  jq ". + [ $new_item ]" "$OUTPUT" > "$tmp" && mv "$tmp" "$OUTPUT"

done

echo "✅ Done! File created at $OUTPUT"