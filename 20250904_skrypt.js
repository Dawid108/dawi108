   function numerateTables() {
    // Wybieramy wszystkie tabele, które NIE mają klasy 'nienumerowana'
    document.querySelectorAll("table:not(.nienumerowana)").forEach(table => {
        let rows = table.querySelectorAll("tr:not(:first-child)");
        rows.forEach((row, index) => {
            let firstCell = row.querySelector("td:first-child");
            if (firstCell) {
                firstCell.textContent = index + 1;
            }
        });
    });
}

window.onload = function() {
    numerateTables();
};

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}
