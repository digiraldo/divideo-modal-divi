<?php
$c = stream_context_create(['http' => ['header' => 'User-Agent: Mozilla/5.0']]);
$html = file_get_contents('https://dev.elegantthemes.com/docs/tutorials/module/beginner/create-simple-quick-module', false, $c);
file_put_contents('tutorial.html', $html);
