const fileName = window.location.pathname.split("/").pop() || "index.html";
const pageUrl = window.location.href;

let namePart = fileName.includes("")
? fileName.split("")[1].replace(".html", "")
: fileName.replace(".html", "");

const now = new Date();
const dateString = now.toLocaleDateString("pl-PL");

let historia108 = JSON.parse(localStorage.getItem("historia108")) || [];

historia108 = historia108.filter(item => item.file !== fileName);

historia108.push({
file: fileName,
name: namePart,
url: pageUrl,
date: dateString
});

if (historia108.length > 10) {
historia108 = historia108.slice(historia108.length - 10);
}

localStorage.setItem("historia108", JSON.stringify(historia108));

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('./20251203_sw.js');
}

// Punkty
let dawid108 = localStorage.getItem("dawid108") || 0;

// Dodawanie 1 punktu co 10 sekund
setInterval(() => {
    dawid108++;
    localStorage.setItem("dawid108", dawid108);
}, 10000);
