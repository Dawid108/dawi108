<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP</title>
</head>
<body>
    <?php
        $kolory = array("czerwony", "pomarańczowy", "żółty", "zielony");
        echo "Oto pierwszy kolor: ".$kolory[0]."<br>";
        $kolory[4] = "niebieski";
        echo "Oto wszystkie elementy tablicy: ";
        for($i = 0; $i <= 4; $i++){
            echo $kolory[$i].", ";
        }
        
        $kolory[5] = 22;
        $kolory[6] = 3.141593;
        $kolory[7] = "w";
        echo "<br>Oto wszystkie elementy tablicy: ";
        for($i = 0; $i <= 7; $i++){
            echo $kolory[$i].", ";
        }

        $cyfry = [0,1,2,3,4,5,6,7,8,9];
        echo "Oto wszystkie cyfry: ";
        for($i = 0; $i <= count($cyfry)-1; $i++){
            echo $cyfry[$i].", ";
        }
        /* oprócz tablic indeksowych numerycznie istnieją w PHP tablice AS, których OCJACYJNE , czyli takie, których indexy mają potać nazw (klucz)*/

        $RGB = array(
            "R" => "czerwony",
            "G"=> "czerwony",
            "B" => "czerwony");
            echo "<br>Oto kolory w modelu RGB: ";
            foreach ($RGB as $element)
            {
                echo $element.", "; 
            }

            echo "<br>Oto elementy tablicy RGB wraz z kluczami: ";
            foreach($RGB as $klucz => $element)
            {
                echo $klucz.": ".$element.", ";
            }
            echo "Oto rodzina Państwa Bocianów:";
            $bociany = [
                "mama" => "Klotylda Bocian",
                "tata" => "Saturnin Bocian",
                "córka" => "Balbina Bocian",
                "syn" => "Andrzej Bocian"
            ];
            foreach ($bociany as $funkcja => $element)
            {
                echo "$funkcja-$element";
            }
            echo "<br>Oto córka państwa Bocianów: ".$bociany['córka'];

            $CMYK = array(
                "C" => "Cyan",
                "M" => "Magenta",
                "Y" => "Yellow",
                "K" => "Black"
            );

            echo "<br>Oto kolory modelu CMYK: ";
            foreach($CMYK as $klucz => $element)
            {
                echo "$klucz-$element, ";
            }

            echo "<h3>FOREACH działa również ze zwykłymi tablicami indeksowanymi numerycznie</h3>";
            $polskie_znaki_diakrytyczne = ['ą', 'ę', 'ć', 'ó', 'ł', 'ń' , 'ś', 'ż', 'ź'];
            echo "Oto polskie znaki diakryryczne: ";
            foreach ($polskie_znaki_diakrytyczne as $element)
            {
                echo $element.", ";
            }

            echo "<h3>Tablice dwuwymiarowe</h3>";

            $macierz = array(
                array(1,1,1,1,1,1),
                array(2,2,2,2,2,2),
                array(3,3,3,3,3,3)
            );
            $suma = 0;
            for($i=0; $i<=2; $i++){
                for($j = 0; $j <= 5; $j++){
                    echo $macierz[$i][$j];
                    $suma = $suma + $macierz[$i][$j];
                }
                echo "<br>";
            }
            echo "<br>Suma powyższej tablicy wynosi $suma.<br>";
            $suma = 0;
            foreach($macierz as $wiersz){
                foreach($wiersz as $element)
                    {
                        echo $element;
                        $suma = $suma + $element;
                    }
                    echo "<br>";
            }
            echo "<br>Suma powyższej tablicy wynosi $suma.<br>";






            echo "<h4>Asocjacyjna tablica dwuwymiarowa przechowująca jako klucz markę samochodu, 
            a jako wartości: moc, kolor i spalanie na 100km</h4>";

            $auta1 = array(
                "BMW" => array(120, "szary", 7.2),
                "Audi" => array(200, "zielony", 9.9),
                "Fiat" => array(90, "czerwony", 5.5),
                "Opel" => array(100, "biały", 5.8)
            );
            echo "Oto najbardziej ekonomiczne samochody, czyli spalające mniej niż 6l/100km: <br>";
            foreach($auta1 as $klucz => $marki){
                if ($marki[2]<6)
                    {
                        echo $klucz.": spalanie ".$marki[2]."l/100km<br>";
                    }
            }
            echo "Oto sumaryczna moc samochodów";
            $moc_sum = 0;
            foreach($auta1 as $marki){
                $moc_sum = $moc_sum + $marki[0];
            }
            echo $moc_sum." KM.<br>";

            echo "Oto wszystkie samochody:<br>";
            foreach($auta1 as $klucz => $marki){
                echo "marka: ".$klucz.", moc: ".$marki[0]." KM, kolor: ".$marki[1].", spalanie: ".$marki[2]." l/100km<br>";
            }

            echo "Oto wszystkie samochody bez opisu i jednostek:<br>";
            foreach($auta1 as $klucz => $marki){
                echo $klucz." ";
                foreach ($marki as $element)
                    {
                        echo $element." ";
                    }
                    echo "<br>";
            }

            echo "<h4>Taka sama tablica dwuwymiarowa jak wyżej tylko nieasocjacyjna, ale zwykła indeksowana numrycznie</h4>";

            $auta2 = [
                ["BMW", 120, "szary", 7.2],
                ["Audi", 200, "zielony", 9.9],
                ["Fiat", 90, "czerwony", 5.5],
                ["Opel", 100, "biały", 5.8]
            ];

            echo "Oto najbardziej ekonomiczne samochody, czyli spalające mniej niż 6l/100km: <br>";
            foreach($auta2 as $marki){
                if($marki[3] < 6){
                    echo "<br>".$marki[0]." Spalanie: ".$marki[3]." l/100km.";
                }
            }

            echo "<br>Oto sumaryczna moc samochodów: <br>";

            $moc_sum2 = 0;
            foreach($auta2 as $marki){
                $moc_sum2 = $moc_sum2 + $marki[1];
            }
            echo $moc_sum2." KM.<br>";

            echo "Oto wszystkie samochody:<br>";
            foreach($auta2 as $marki){
                echo "marka: ".$marki[0].", moc: ".$marki[1]." KM, kolor: ".$marki[2].", spalanie: ".$marki[3]." l/100km<br>";
            }

            echo "Oto wszystkie samochody bez opisu i jednostek:<br>";
            foreach($auta2 as $auto){
                foreach ($auto as $element)
                    {
                        echo $element." ";
                    }
                    echo "<br>";
            }
    ?>
</body>
</html>
