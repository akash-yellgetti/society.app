#!/bin/bash
for file in $(find . -name "*$1");
do
  rm -rf "$file"
done