<?php
$files = glob('C:/laragon/www/diserwp/wp-content/themes/Divi/includes/builder-5/public/packages/*/module.json');
if (!empty($files)) {
    echo file_get_contents($files[0]);
} else {
    echo "NO FILES FOUND";
}
