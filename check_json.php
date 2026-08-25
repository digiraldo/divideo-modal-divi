<?php
$content = file_get_contents('visual-builder/src/module.json');
$json = json_decode($content);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "JSON ERROR: " . json_last_error_msg();
} else {
    echo "JSON OK";
}
