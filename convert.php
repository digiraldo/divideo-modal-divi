<?php
$html = file_get_contents('tutorial.html');
$text = strip_tags($html);
file_put_contents('tutorial.txt', $text);
