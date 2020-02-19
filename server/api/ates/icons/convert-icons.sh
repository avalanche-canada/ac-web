

for file in $(ls *.svg)
do
	file_name=$(echo "$file" | cut -d '.' -f 1 )
	inkscape --export-type="png" $file_name.svg
	echo $file_name
done
