<?php
// Save the score to the scores.txt file
if(isset($_POST['name']) && isset($_POST['score'])) {
    $name = $_POST['name'];
    $score = $_POST['score'];
    $file = fopen('scores.txt', 'r+');
    $found = false;
    while(($line = fgets($file)) !== false) {
        $parts = explode(',', $line);
        if(count($parts) === 2 && trim($parts[0]) === $name) {
            // If the name already exists, update the score if it's higher
            $found = true;
            if((int)$parts[1] < (int)$score) {
                fseek($file, -strlen($line), SEEK_CUR);
                fwrite($file, "$name,$score\n");
            }
            break;
        }
    }
    if(!$found) {
        // If the name doesn't exist, add it to the end of the file
        fwrite($file, "$name,$score\n");
    }
    fclose($file);
}
?>