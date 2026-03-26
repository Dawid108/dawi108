<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Formularz w PHP</title>
    <link rel="icon" href="dawi108.png">
    <script src="script.js"></script>
    <style>
        ul{
            list-style-type: square;
        }
        p{
            background-color: yellow;
            color: red;
            font-weight: bold;
        }
        div{
            text-align: center;
            margin: 0 auto;
            background-color: navy;
            color: yellow;
            width: 500px;
        }
        .div2{
            border: 1px dotted red;
            background-color: yellow;
            color: navy;
            margin-bottom: 5px;
        }
        ol{
            list-style-type: lower-greek;
        }
        span{
            background-color: crimson;
            color: yellow;
            weight: bold;
            border: 1px dashed green;
            padding: 1px;
        }
    </style>
</head>
<body>
    <?php
        $imie = $_POST['imie'];
        $wiek = $_POST['wiek'];
        $kategoria = $_POST['kategoria'];
        $ulubione = $_POST['ulubione'];
        $liczba = $_POST['liczba'];
        $pochodzenie = $_POST['pochodzenie'];
        $ekranizacje = $_POST['ekranizacje'];
        $Tolkien = $_POST['Tolkien'];

        $dp = fopen('20260326_dane.txt', 'w'); //dp - deskryptor pliku

        $tekst1 = "Jesteś $imie i masz $wiek lat.";
        echo "$tekst1<br>";
        fwrite($dp, $tekst1."\n");
        $tekst2 =  "Oto twoje ulubione kategorie książek: ";
        echo "<br>$tekst2";
        fwrite($dp, $tekst2);
        echo "<ul>";
        foreach($kategoria as $element){
            echo "<li>$element</li>";
            fwrite($dp, $element.", ");
        }
        echo "</ul>";
        $tekst3 = "O swoim ulubionym autorze powiedziałeś: $ulubione";
        echo "$tekst3<br>";
        fwrite($dp, "\n".$tekst3."\n");
        $tekst4 = "Przeczytałeś $liczba książek tego autora.";
        echo "$tekst4<br>";
        fwrite($dp, $tekst4."\n");

        $tekst5 = "Twoje książki pochodzą z: ";
        echo "$tekst5";
        fwrite($dp, $tekst5);
        foreach($pochodzenie as $element){
            echo "<div class='div2'>$element</div>";
            fwrite($dp, $element.", ");
        }
        $tekst6 = "Oto Twoje ulubione ekranizacje: ";
        echo $tekst6;
        fwrite($dp, "\n".$tekst6);
        echo "<ol>";
        foreach($ekranizacje as $element){
            echo "<li>$element</li>";
            fwrite($dp, $element.", ");

        }
        echo "</ol>";

        $tekst7 = "Oto Twoje ulubione ekranizacje Tolkiena: ";
        echo "<br>$tekst7<br>";
        fwrite($dp, "\n".$tekst7);
        foreach($Tolkien as $element){
            echo "<span>$element</span><br>";
            fwrite($dp, $element.", ");
        }

        
    ?>
</body>
</html>
