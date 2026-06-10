// Punkty
let dawid108 = parseInt(localStorage.getItem("dawid108")) || 0;

// Dodawanie 1 punktu co 10 sekund
setInterval(() => {
    dawid108++;
    localStorage.setItem("dawid108", dawid108);
}, 10000);

// Historia stron
const fileName = window.location.pathname.split("/").pop() || "index.html";
const pageUrl = window.location.href;

let namePart = fileName.includes("_")
    ? fileName.split("_")[1].replace(".html", "")
    : fileName.replace(".html", "");

const now = new Date();
const dateString = now.toLocaleDateString("pl-PL");

let historia108 = JSON.parse(localStorage.getItem("historia108")) || [];

// Usunięcie poprzedniego wpisu tej samej strony
historia108 = historia108.filter(item => item.file !== fileName);

// Dodanie aktualnej strony
historia108.push({
    file: fileName,
    name: namePart,
    url: pageUrl,
    date: dateString
});

// Zachowanie tylko 10 ostatnich stron
if (historia108.length > 10) {
    historia108 = historia108.slice(-10);
}

localStorage.setItem("historia108", JSON.stringify(historia108));

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./20251203_sw.js');
}