#!/bin/bash

SCRIPT_DIR=`dirname "$0"`
CSS_DIR="$SCRIPT_DIR/../css"
JS_DIR="$SCRIPT_DIR/../js"
YUIC_JAR="$SCRIPT_DIR/yuicompressor-2.4.7.jar"
YUIC="java -jar $YUIC_JAR"
JS_LIST="global"
CSS_LIST="colorbox layout tinymce"

# Minify JavaScript
for FILE in $JS_LIST; do
	echo "Minifying $FILE.js ..."
	$YUIC -o "$JS_DIR/$FILE-min.js" "$JS_DIR/$FILE.js"
done

# Minify CSS
for FILE in $CSS_LIST; do
	echo "Minifying $FILE.css ..."
	$YUIC -o "$CSS_DIR/$FILE-min.css" "$CSS_DIR/$FILE.css"
done
echo "Minifying style.css ..."
cat "$CSS_DIR/layout.css" "$CSS_DIR/common.css" "$CSS_DIR/screen.css" | $YUIC -o "$CSS_DIR/style-min.css" --type css
