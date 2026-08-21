if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('./20251203_sw.js');
}

let id108 = localStorage.getItem("id108");

if (
    !id108 ||
    isNaN(id108)
) {
    id108 =
    Math.floor(Math.random() * 9999) + 1;

    localStorage.setItem(
        "id108",
        id108
    );

    console.log("Nowy numer:", id108);
} else {
    console.log("Numer:", id108);
}