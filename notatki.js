// Lista przykładowych notatek
const notes = [
  {
    subject: "Biologia",
    date: "2025-09-19",
    topic: "Budowa komórki",
    content: `
      <strong>Najważniejsze elementy:</strong>
      <ul>
        <li>Błona komórkowa</li>
        <li>Cytoplazma</li>
        <li>Jądro komórkowe</li>
      </ul>
    `
  },
  {
    subject: "Matematyka",
    date: "2025-09-18",
    topic: "Funkcje kwadratowe",
    content: `
      <ol>
        <li>Postać ogólna: ax²+bx+c</li>
        <li>Delta = b² - 4ac</li>
        <li>Miejsce zerowe: x = (-b ± √Δ) / 2a</li>
      </ol>
    `
  },
  {
    subject: "Historia",
    date: "2025-09-17",
    topic: "Rewolucja Francuska",
    content: `
      <p>Rozpoczęła się w <strong>1789 roku</strong>.</p>
      <p>Przyczyny:</p>
      <ul>
        <li>Kryzys gospodarczy</li>
        <li>Niezadowolenie społeczne</li>
        <li>Nierówności stanowe</li>
      </ul>
    `
  }
];

// Kontener na notatki
const notesContainer = document.getElementById("notesContainer");
const subjectFilter = document.getElementById("subjectFilter");

// Funkcja renderująca notatki
function renderNotes(filter) {
  notesContainer.innerHTML = "";

  const filteredNotes = filter === "Wszystkie"
    ? notes
    : notes.filter(note => note.subject === filter);

  filteredNotes.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    noteDiv.innerHTML = `
      <h2>${note.subject}</h2>
      <p class="date">${note.date}</p>
      <p class="topic">T: ${note.topic}</p>
      <div class="content">${note.content}</div>
    `;

    notesContainer.appendChild(noteDiv);
  });
}

// Obsługa zmiany w filtrze
subjectFilter.addEventListener("change", (e) => {
  renderNotes(e.target.value);
});

// Domyślne wyświetlenie wszystkich notatek
renderNotes("Wszystkie");