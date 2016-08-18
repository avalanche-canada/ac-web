#!/bin/sh

# Merges multiple shapefiles into a single shapefile

set -e

if [ "$#" -lt 2 ]; then
  echo "Usage:"
  echo "  merge_shapefiles.sh <output_file> <input_files>..."
  echo 
  exit 1
fi


OUTFILE=$1
shift

MERGEFILES=$@

for f in $MERGEFILES; do 
  if [ -f "$OUTFILE" ]; then
    echo "merging $f..."
    ogr2ogr -f 'ESRI Shapefile' -update -append "$OUTFILE" "$f" #-nln merge
  else
    echo "Creating $OUTFILE with $f..."
    ogr2ogr -f 'ESRI Shapefile' "$OUTFILE" "$f"
  fi
done
