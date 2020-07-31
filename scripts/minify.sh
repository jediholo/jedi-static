#!/bin/bash

SCRIPT_DIR=`dirname "$0"`
CSS_DIR="$SCRIPT_DIR/../css"
JS_DIR="$SCRIPT_DIR/../js"
YUIC_JAR="$SCRIPT_DIR/yuicompressor-2.4.7.jar"
YUIC="java -jar $YUIC_JAR"

# Minify JavaScript
$YUIC -o "$JS_DIR/global-min.js" "$JS_DIR/global.js"

# Minify CSS
cat "$CSS_DIR/layout.css" "$CSS_DIR/common.css" "$CSS_DIR/screen.css" | $YUIC -o "$CSS_DIR/style-min.css" --type css
$YUIC -o "$CSS_DIR/colorbox-min.css" "$CSS_DIR/colorbox.css"
$YUIC -o "$CSS_DIR/layout-min.css" "$CSS_DIR/layout.css"
$YUIC -o "$CSS_DIR/tinymce-min.css" "$CSS_DIR/tinymce.css"
