#! /bin/bash

destination_folder='/home/ubuntu/proyects/blog-server/src/public'

npm run build

current_client="$PWD/dist"

for file in  "$current_client"/*
do
echo "$file"
cp -r "$file" "$destination_folder"

done

cd "$destination_folder" || exit

echo 'fisnish'