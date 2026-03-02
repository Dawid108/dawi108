<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For Małpki - odp</title>
    <link href="dawi108.png" rel="icon">
    <script src="script.js"></script>
</head>
<body>
    <?php
        $k=$_GET['k'];
        $w=$_GET['w'];

        for($i=1; $i<=$w; $i++){
            echo "<br>";
            for($j=1; $j<=$k; $j++){
                echo "@";
            }
        }
    ?>
</body>
</html>
