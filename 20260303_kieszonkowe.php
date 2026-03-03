<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kieszonkowe - odp</title>
    <link href="dawi108.png" rel="icon">
    <script src="script.js"></script>
</head>
<body>
    <?php
        $kwota_pocz = $_GET['kwota_pocz']; //początkowe kieszonkowe
        $wzrost = $_GET['wzrost']; //ile kieszonkowe rośnie co miesiąc
        $kwota_konc = $_GET['kwota_konc']; //końcowe kieszonkowe
        $kwota = $kwota_pocz; //aktualna kwota kieszonkowego
        $suma = $kwota_pocz; // ile zanbierano do tej pory
        $nr = 1;

        while($suma < $kwota_konc){
            echo "$nr $kwota $suma<br>";
            $kwota = $kwota + $wzrost;
            $suma = $suma + $kwota;
            $nr++;
        }
        
        echo "$nr $kwota $suma<br>";
    ?>
</body>
</html>
