<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Formularz w PHP</title>
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

        echo "<p>Jesteś $imie i masz $wiek lat.</p>";
        echo "Oto twoje ulubione kategorie książek: <ul>";
        foreach($kategoria as $element){
            echo "<li>$element</li>";
        }
        echo "</ul><div><br>O swoim ulubionym autorze powiedziałeś: $ulubione</div><br>";
        echo "Przeczytałeś $liczba książek tego autora.<br>";
        echo "Twoje książki pochodzą z: ";
        foreach($pochodzenie as $element){
            echo "<div class='div2'>$element</div>";
        }
        echo "Ulubione ekranizacje:<ol>";
        foreach($ekranizacje as $element){
            echo "<li>$element</li>";
        }
        echo "</ol>";

        foreach($Tolkien as $element){
            echo "<span>$element</span><br>";
        }

        
    ?>
</body>
</html>
