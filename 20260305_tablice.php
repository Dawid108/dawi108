<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tablice</title>
    <link rel="icon" href="dawi108.png">
    <script src="script.js"></script>
</head>
<body>
    <?php
        $kolory = array("czerwony", "pomarańczowy", "żółty", "zielony");
        echo "Oto pierwszy kolor: ".$kolory[0]."<br>";
        $kolory[4] = "niebieski";

        echo "Oto wszystkie elementy tablicy: ";
        for($i=0; $i<=4; $i++){
            echo $kolory[$i].", ";
        }

        $kolory[5] = 22;
        $kolory[6] = 3.141593;
        $kolory[7] = 'w';
        
        echo "<br>Oto wszystkie elementy tablicy: ";
        for($i=0; $i<=4; $i++){
            echo $kolory[$i].", ";
        }

        $cyfry = [0,1,2,3,4,5,6,7,8,9];
        echo "<br>Oto wszystkie cyfry: ";
        for($i=0; $i<=count($cyfry)-1;  $i++){
            echo $cyfry[$i].", ";
        }

        echo "<h3>Oprócz tablic indeksowanych numeryczie istnieją w PHP tablice ASOCJACYJNE, czyli takie, których indeksy mają postać nazw (klucz)</h3>";

        $RGB = array(
            "R" => "czerwony",
            "G" => "zielony",
            "B" => "niebieski";
        )
    ?>
</body>
</html>
