<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Odczyt pliku w PHP</title>
</head>
<body>
    <h3>Oto co odczytałem z pliku kotek.txt</h3>
    <?php 
        $dp = fopen('20260326_kotek.txt', 'r');
        $liczba_bajtow = fpassthru($dp);
        fclose($dp);
        echo "<br>";

        $lb = readfile('20260326_kotek.txt');
        echo "<br>$lb";
        echo "<br><br>";

        $wiersze = file('20260326_kotek.txt');
        foreach ($wiersze as $wiersz){
            // echo $wiersz."<br>";
            $wiersz2 = nl2br($wiersz);
            echo $wiersz2;
        }
    ?>
</body>
</html>
