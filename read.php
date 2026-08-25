<?php
$c = stream_context_create(['http' => ['header' => 'User-Agent: Mozilla/5.0']]);
$html = file_get_contents('https://dev.elegantthemes.com/docs/category/beginner', false, $c);
file_put_contents('beginner.html', $html);
file_put_contents('beginner.txt', strip_tags($html));
