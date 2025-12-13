// pobierz nazwę pliku, np. "20250901_szkola.html"
let fileName = window.location.pathname.split("/").pop();

// pełny adres
let pageUrl = window.location.href;

// pobierz nazwę między _ a .html  → np. "szkola"
let namePart = fileName.split("_")[1].split(".")[0];

// aktualna data w formacie PL
let now = new Date();
let dateString = now.toLocaleDateString("pl-PL");

// pobierz historię albo pustą tablicę
let historia108 = JSON.parse(localStorage.getItem("historia108")) || [];

// usuń stare wpisy tej samej strony (żeby nie było duplikatów)
historia108 = historia108.filter(item => item.file !== fileName);

// dodaj NOWY wpis na koniec (sortowaniem zajmiemy się na stronie historii)
historia108.push({
    file: fileName,
    name: namePart,
    url: pageUrl,
    date: dateString
});

// zapisz
localStorage.setItem("historia108", JSON.stringify(historia108));


// ===== PRZENIESIENIE DANYCH DO INFINITYFREE =====
(function () {
    let punkty = localStorage.getItem("dawid108");
    let historia = localStorage.getItem("historia108");

    if (punkty === null) return;

    let url = "https://dawid108.infinityfree.me/receive.html"
        + "?punkty=" + encodeURIComponent(punkty)
        + "&historia=" + encodeURIComponent(historia || "[]");

    // tylko zapis – bez zapętlenia
    if (!sessionStorage.getItem("sentToInfinity")) {
        sessionStorage.setItem("sentToInfinity", "1");
        window.location.href = url;
    }
})();
