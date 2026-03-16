<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        // wyświetlanie tablicy ze znakami rozdzielającymi: implode(znak, tablica)
        $cyfry = [0,1,2,3,4,5,6,7,8,9];
        echo implode(", ",$cyfry);
        echo "<br>".implode($cyfry);

        // odwrócenie kolejności elementów tablicy: array_reverse(tablica)
        $cyfry2 = array_reverse($cyfry);
        echo "<br>".implode($cyfry2);
        
        // suma elementów tablicy: array_sum(tablica)
        echo "<br>Oto suma wszystkih cyfr: ".array_sum($cyfry);

        // iloczyn elementów tablicy: array_product(tablica)
        echo "<br>Oto iloczyn wszystkich cyfr: ".array_product($cyfry);
        
        //tablica z elementami od $a do $b: range($a, $b)

        

        // dodawanie elementów do tablicy 
        $cyfry = [0,1,2,3,4,5,6,7,8,9];
        echo implode(",",$cyfry);
        echo "<br>".implode($cyfry);
    
        $cyfry2 = array_reverse($cyfry);
    
        echo "<br>".implode($cyfry2);
       
        echo "<br> Oto suma wszystkich cyfr: ".array_sum($cyfry);
    
        echo "<br> Oto iloczyn wszystkich cyfr: ".array_product($cyfry);
    
        $a = 90;
        $b = 99;
        $tab = range($a,$b);
        echo "<br>".implode(",",$tab);
        $tab2 = range(-5,5);
        echo "<br>".implode(",",$tab2);
    
    
        $owoce = ["jabłko", "banan"];
        $warzywa = ["czerwone" => "pomidor", "zielone" => "ogórek"];
        $owoce[2] = "gruszka";
        $warzywa["białe"] = "pietruszka";
        echo "<br>owoce: ". implode(", ", $owoce);
        echo "<br>warzywa: ". implode(", ", $warzywa);
    ?>
</body>
</html>
