const fileName = window.location.pathname.split("/").pop() || "index.html";
const pageUrl = window.location.href;

let namePart = fileName.includes("_")
    ? fileName.split("_")[1].replace(".html", "")
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

if (historia108.length > 100) {
    historia108 = historia108.slice(historia108.length - 100);
}

localStorage.setItem("historia108", JSON.stringify(historia108));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./20260106_sw.js');
}
