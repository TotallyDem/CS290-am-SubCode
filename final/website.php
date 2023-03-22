<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Web Snake🐍</title>
        <meta charset="UTF-8">
        <meta name="keywords" content="Game, Project, Incomplete">
        <meta name="author", content="Alex Murray">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles/style.css">
    </head>
    <!-- Todo: Finish second page such that it meets requirements. -->
    <body>
        <div class="wrapper">
            <div class="maincolumn">
                <h1 id="mainheader">Net Snake</h1>
                <p>Made in javascript<br>Over 1 course</p>
                <canvas id="canvas" width="400" height="400" style="background-color: black;"></canvas>
                <button id="restartbutton" onclick="reset()">Click to restart!</button>
                <form method="post">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" pattern="[A-Za-z\s]+" required title="Please enter only alphabetic characters and spaces">
                    <label for="score">Score:</label>
                    <input type="number" id="score" name="score">
                    <button type="submit">Submit</button>
                </form>
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
// Load the scores from the scores.txt file
$scores = [];
$file = fopen('scores.txt', 'r');
if($file) {
    while(($line = fgets($file)) !== false) {
        $parts = explode(',', $line);
        if(count($parts) === 2) {
            $scores[] = ['name' => $parts[0], 'score' => $parts[1]];
        }
    }
    fclose($file);
}

// Sort the scores by score (descending)
usort($scores, function($a, $b) {
    return $b['score'] - $a['score'];
});

?>

<ol>
    <?php foreach($scores as $score): ?>
        <li><?php echo $score['name'] ?> - <?php echo $score['score'] ?></li>
    <?php endforeach; ?>
</ol>
                <div class="extracontent">
                    <h2>Neat links</h2>
                    <div class="download">
                        <a href="snakewebsite.zip" download>Download</a>
                    </div>
                    <p style="display: inline;">snakewebsite.zip</p>
                    <h3>Game features</h3>
                    <ol>
                        <li>Ability to pause; Hit escape!</li>
                        <li>A snake head colored differently from the body</li>
                        <li>Prevents page from scrolling when using arrow keys</li>
                    </ol>
                </div>
            </div>								    
        </div>
        <script defer src="scripts/snake.js"></script>
    </body>
</html>
	