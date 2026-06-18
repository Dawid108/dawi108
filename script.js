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

let czas108 = localStorage.getItem("czas108") || 0;

setInterval(() => {
    czas108 += 10;
    localStorage.setItem("czas108", czas108);
}, 10000);

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
