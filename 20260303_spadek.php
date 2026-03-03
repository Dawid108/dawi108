<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Do While Spadek - odp</title>
    <link href="dawi108.png" rel="icon">
    <script src="script.js"></script>
</head>
<body>
    <?php
        $spadek = $_GET['spadek']; 
        $wydatek_pocz = $_GET['wydatek_pocz'];
        $wzrost = $_GET['wzrost']; 
        
        $nr = 1;
        $wydatek_miesieczny = $wydatek_pocz;
        $pozostalo = $spadek;

        do {
            $pozostalo = $pozostalo - $wydatek_miesieczny;

            echo "Miesiąc: $nr | Wydatek: $wydatek_miesieczny zł | Pozostało: $pozostalo zł <br>";

            $nr++;
            $wydatek_miesieczny = $wydatek_miesieczny + $wzrost;

        } while ($pozostalo >= $wydatek_miesieczny); 
        
        echo "<br>Skończyły się pieniądze lub nie starczy na kolejny pełny miesiąc.";
    ?>
</body>
</html>
