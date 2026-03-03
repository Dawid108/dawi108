<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For Lokata - odp</title>
    <link href="dawi108.png" rel="icon">
    <script src="script.js"></script>
</head>
<body>
    <?php
      // Pobieranie danych z formularza (dokładnie takie same nazwy)
      $kwota = $_GET['kwota'];
      $procenty = $_GET['procenty'];
      $czas = $_GET['czas'];
      $kapit = $_GET['kapit'];
      
      // Obliczamy ile razy w ogóle dopiszemy odsetki
      $ile_razy = $czas * $kapit;
      
      // Obliczamy oprocentowanie na pojedynczy okres (np. 5% rocznie / 4 kwartały)
      $procent_na_okres = ($procenty / 100) / $kapit;
      
      echo "<h2>Symulacja Twojej lokaty:</h2>";
      
      // Pętla FOR wykonująca się tyle razy, ile jest kapitalizacji
      for ($i = 1; $i <= $ile_razy; $i++) {
          
          $odsetki = $kwota * $procent_na_okres;
          $kwota = $kwota + $odsetki; // powiększamy kwotę o odsetki
      
          echo "Kapitalizacja nr $i: Masz już " . round($kwota, 2) . " zł<br>";
      }
      
      echo "<h3>Suma końcowa: " . round($kwota, 2) . " zł</h3>";
    ?>
</body>
</html>
