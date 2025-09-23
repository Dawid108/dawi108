// Lista przykładowych notatek
const notes = [   
 {
    subject: "Biologia",
    date: "2025-09-19",
    topic: "Budowa i funkcje układu krwionośnego",
    content: `
  <ol>
    <li>
      <p><strong>1. Funkcja układu krwionośnego</strong></p>

      <p>Transportuje krew, dostarcza tlen i składniki odżywcze, usuwa dwutlenek węgla i produkty przemiany materii.</p>

      <p>Uczestniczy w rozprowadzaniu hormonów, regulacji temperatury i obronie organizmu.</p>
    </li>

    <li>
      <p><strong>2. Budowa tętnic, żył i naczyń włosowatych</strong></p>

      <ul>
        <li><strong>Tętnice</strong> – grube, elastyczne ściany, prowadzą krew od serca.</li>
        <li><strong>Żyły</strong> – cieńsze ściany, mają zastawki, prowadzą krew do serca.</li>
        <li><strong>Naczynia włosowate</strong> – bardzo cienkie, umożliwiają wymianę gazów i substancji.</li>
      </ul>
    </li>

    <li>
      <p><strong>3. Budowa serca</strong></p>

      <p>Serce ma cztery jamy: dwa przedsionki i dwie komory.</p>

      <p>Posiada zastawki kierujące przepływem krwi.</p>

      <p>Ściana serca: wsierdzie, mięsień sercowy, osierdzie.</p>
    </li>
  </ol>
    `
  },
 {
    subject: "Historia",
    date: "2025-09-18",
    topic: "Wyprawa tysiąca czerwonych koszul",
    content: `
  <p><strong>Wyprawa tysiąca czerwonych koszul</strong> była zbrojną akcją ochotników pod dowództwem Giuseppe Garibaldiego w 1860 roku. Jej nazwa wzięła się od charakterystycznych czerwonych koszul, które nosili uczestnicy. Oddziały Garibaldiego wylądowały na Sycylii, szybko opanowały wyspę, a następnie przeprawiły się do Kalabrii i ruszyły na Neapol. Do działań przyłączyła się armia piemoncka, dzięki czemu we wrześniu 1860 roku zdobyto Neapol. Późniejszy plebiscyt na południu Włoch potwierdził wolę mieszkańców dołączenia do procesu zjednoczenia Włoch.</p>
    `
  }, 
 {
    subject: "Geografia",
    date: "2025-09-17",
    topic: "Urbanizacja na świecie i funkcje miasta",
    content: `
    <ol>
        <li><strong>Urbanizacja</strong> – proces wzrostu liczby ludności mieszkającej w miastach oraz rozwoju i powiększania się miast, a także przenikania miejskiego stylu życia na obszary wiejskie.</li>
        <li><strong>Aglomeracja monocentryczna</strong> – zespół miejski skupiony wokół jednego dużego miasta (metropolii), np. Warszawa z otaczającymi ją miejscowościami.</li>
        <li><strong>Aglomeracja policentryczna (konurbacja)</strong> – obszar miejski, w którym funkcjonuje kilka dużych, równorzędnych miast połączonych gospodarczo i komunikacyjnie, np. Górnośląsko-Zagłębiowska Metropolia.</li>
        <li><strong>Megalopolis</strong> – ogromny obszar silnie zurbanizowany, składający się z wielu miast i aglomeracji, które się ze sobą łączą, np. BosWash w USA (od Bostonu po Waszyngton).</li>
        <li><strong>Miasto</strong> – większe skupisko ludności, posiadające prawa miejskie, charakteryzujące się przewagą zatrudnienia w usługach i przemyśle oraz pełniące różnorodne funkcje gospodarcze, administracyjne i społeczne.</li>
    </ol>

    <hr>

    <p><strong>Pozytywy rozwoju urbanizacji (5)</strong></p>
    <ol>
        <li>Rozwój gospodarki dzięki koncentracji przemysłu, usług i kapitału.</li>
        <li>Lepszy dostęp do edukacji i szkolnictwa wyższego.</li>
        <li>Szeroka oferta kulturalna i rozrywkowa (muzea, kina, teatry).</li>
        <li>Rozwój komunikacji i infrastruktury technicznej (drogi, kolej, internet).</li>
        <li>Większe możliwości zatrudnienia i rozwoju zawodowego.</li>
    </ol>

    <hr>

    <p><strong>Negatywy rozwoju urbanizacji (5)</strong></p>
    <ol>
        <li>Przeludnienie i problemy mieszkaniowe w dużych miastach.</li>
        <li>Zanieczyszczenie środowiska (powietrza, wody, hałas, odpady).</li>
        <li>Wzrost kosztów życia i duże różnice społeczne.</li>
        <li>Rozwój patologii społecznych (bezdomność, przestępczość).</li>
        <li>Niszczenie terenów zielonych i rolniczych przez rozrastanie się miast (suburbanizacja).</li>
    </ol>

    <hr>

    <p><strong>Funkcje miast (10)</strong></p>
    <ol>
        <li>Administracyjna – siedziba władz (np. Warszawa).</li>
        <li>Gospodarcza – centra przemysłu, handlu, finansów.</li>
        <li>Komunikacyjna – węzły transportowe (lotniska, porty, koleje).</li>
        <li>Kulturalna – teatry, muzea, centra sztuki.</li>
        <li>Naukowa – uniwersytety, instytuty badawcze.</li>
        <li>Religijna – ośrodki kultu religijnego (np. Częstochowa).</li>
        <li>Turystyczna – atrakcje, zabytki, kurorty.</li>
        <li>Militarna – garnizony, bazy wojskowe.</li>
        <li>Zdrowotna – uzdrowiska, szpitale specjalistyczne.</li>
        <li>Rozrywkowa – stadiony, kluby, centra rozrywki.</li>
    </ol>
    `
  },  
 {
    subject: "Geografia",
    date: "2025-09-17",
    topic: "Ludność i Osadnictwo",
    content: `
    <p><strong>Geografia.</strong></p>
    <p><strong>Dział:</strong> ludność i osadnictwo.</p>
    <p><strong>Tematy:</strong></p>
    <ul>
        <li>Urbanizacja na świecie,</li>
        <li>Funkcje miasta.</li>
    </ul>

    <p><strong>Wyjaśnij pojęcia:</strong></p>
    <ol>
        <li>Urbanizacja.</li>
        <li>Aglomeracja monocentryczna.</li>
        <li>Aglomeracja policentryczna.</li>
        <li>Megalopolis.</li>
        <li>Miasto.</li>
    </ol>

    <p><strong>Wymień:</strong></p>
    <ol>
        <li>Pozytywy rozwoju urbanizacji (5).</li>
        <li>Negatywy rozwoju urbanizacji (5).</li>
        <li>Funkcje miast (10).</li>
    </ol>
    `
  }, 
 {
    subject: "Język Polski",
    date: "2025-09-17",
    topic: "Charakterystyka Ignacego Rzeckiego",
    content: `
    <ul type="a">
        <li>
            <strong>Co myśli o miłości?</strong><br>
            Ignacy Rzecki uważa miłość za uczucie niezwykle ważne, ale też ulotne i trudne do osiągnięcia. Sam nigdy nie założył rodziny, pozostał samotnikiem. Widział w miłości raczej ideał romantyczny niż realne doświadczenie, przez co traktował ją z nostalgią.
        </li>
        <li>
            <strong>Jaki jest jego stosunek do Napoleona?</strong><br>
            Rzecki jest wielkim entuzjastą Napoleona Bonaparte i całej idei napoleońskiej. Uważa cesarza za bohatera, symbol walki o wolność i sprawiedliwość. Jego młodzieńcze ideały pozostały żywe do końca życia i często kierowały jego sposobem myślenia o świecie.
        </li>
        <li>
            <strong>Jak wspomina udział w Wiośnie Ludów i Powstaniu Styczniowym?</strong><br>
            Z ogromną tęsknotą wspomina lata młodości, gdy brał udział w wydarzeniach rewolucyjnych. Walczył w Wiośnie Ludów, a także wspierał Polaków podczas Powstania Styczniowego. Pamięta te czasy jako pełne nadziei i poświęcenia, mimo że zakończyły się klęską.
        </li>
        <li>
            <strong>Jaki ma stosunek do ludzi innych narodowości?</strong><br>
            Rzecki odznacza się dużą tolerancją wobec obcokrajowców. W młodości miał wielu przyjaciół wśród Niemców i Węgrów, cenił ich kulturę i otwartość. Potrafił dostrzegać w nich ludzi o podobnych wartościach, co wynikało z jego doświadczeń i patriotyzmu europejskiego.
        </li>
        <li>
            <strong>Jakie ma marzenia wobec społeczeństwa polskiego?</strong><br>
            Marzy o tym, aby Polacy byli narodem wolnym, silnym i solidarnym. Chciałby, aby społeczeństwo odrodziło się moralnie i gospodarczo, a młodsze pokolenie kontynuowało walkę o ojczyznę. Jego marzenia są idealistyczne, pełne patriotycznego romantyzmu.
        </li>
        <li>
            <strong>Jaki jest jego stosunek do Stanisława Wokulskiego?</strong><br>
            Ignacy darzy Wokulskiego ogromną przyjaźnią i szacunkiem. Traktuje go jak ucznia i niemal syna, w którego wierzy bezgranicznie. Broni go przed krytyką i nie rozumie w pełni jego działań, ale jest mu bezwarunkowo lojalny i oddany.
        </li>
        <li>
            <strong>Jaki ma stosunek do pieniędzy?</strong><br>
            Rzecki traktuje pieniądze jako narzędzie do życia, a nie cel sam w sobie. Jest człowiekiem skromnym, uczciwym i pracowitym. Nie przywiązuje wagi do bogactwa, lecz do wartości duchowych i moralnych, przez co stoi w opozycji do materializmu epoki.
        </li>
        <li>
            <strong>Jak jest odbierany przez ludzi?</strong><br>
            Ignacy Rzecki odbierany jest jako człowiek uczciwy, wierny i trochę staroświecki. Wzbudza szacunek swoją pracowitością i prawością, ale bywa postrzegany jako marzyciel oderwany od rzeczywistości. Mimo to cieszy się sympatią otoczenia, które docenia jego dobroć.
        </li>
    </ul>
    `
  }, 
 {
    subject: "Język Polski",
    date: "2025-09-17",
    topic: "Pytania Ignacy Rzecki",
    content: `
    <p><strong>Charakterystyka Ignacego Rzeckiego:</strong></p>
    <p><strong>a) Co myśli o miłości?</strong></p>
    <p><strong>b) Jaki jest jego stosunek do Napoleona?</strong></p>
    <p><strong>c) Jak wspomina udział w Wiośnie Ludów i Powstaniu Styczniowym?</strong></p>
    <p><strong>d) Jaki ma stosunek do ludzi innych narodowości?</strong></p>
    <p><strong>e) Jakie ma marzenia wobec społeczeństwa polskiego?</strong></p>
    <p><strong>f) Jaki jest jego stosunek do Stanisława Wokulskiego?</strong></p>
    <p><strong>g) Jaki ma stosunek do pieniędzy?</strong></p>
    <p><strong>h) Jak jest odbierany przez ludzi?</strong></p>
    `
  },
 {
    subject: "Język Polski",
    date: "2025-09-15",
    topic: "Charakterystyka bohaterów Lalki",
    content: `
    <ol>
        <li>
            <strong>Stanisław Wokulski</strong><br>
            Wokulski to mężczyzna w średnim wieku, postawny, o szlachetnych rysach twarzy. 
            Jest ambitny, pracowity i pełen determinacji, a jednocześnie wrażliwy i romantyczny. 
            Dorobił się majątku na dostawach dla wojska, prowadził także sklep galanteryjny. 
            Zakochany w Izabeli Łęckiej, próbuje zdobyć jej serce, inwestując w jej rodzinę i wchodząc do arystokracji. 
            Choć odnosi sukcesy finansowe, cierpi przez nieszczęśliwą miłość, co prowadzi go do rozpaczy i zagubienia.
        </li>

        <li>
            <strong>Ignacy Rzecki</strong><br>
            Rzecki to starszy subiekt o siwych włosach i drobnej sylwetce. 
            Jest lojalny, uczciwy i niezwykle oddany Wokulskiemu. 
            Prowadzi sklep pod nieobecność właściciela, zachowując porządek i tradycyjne zasady handlu. 
            W młodości walczył na Węgrzech, a jego serce zawsze biło dla idei wolności. 
            Pisze pamiętnik, w którym wyraża swoje marzenia o odrodzeniu Napoleona i sprawiedliwszym świecie. 
            Naiwnie wierzy, że Wokulski może połączyć arystokrację z mieszczaństwem i odmienić los ojczyzny.
        </li>

        <li>
            <strong>Julian Ochocki</strong><br>
            Ochocki to młody arystokrata o szczupłej budowie i inteligentnym spojrzeniu. 
            Charakteryzuje go ciekawość świata, energia i pasja naukowa. 
            Jest idealistą, pragnie poświęcić życie nauce i marzy o stworzeniu latających machin. 
            Choć należy do arystokracji, nie interesują go bale ani konwenanse – szuka raczej ludzi światłych i otwartych. 
            W powieści przyjaźni się z Wokulskim i wspiera go, podzielając jego poglądy na potrzebę postępu i rozwoju technicznego w Polsce.
        </li>
    </ol>
    `
  },
  {
    subject: "Język Polski",
    date: "2025-09-09",
    topic: "Problem antysemityzmu w literaturze II połowy XIX w.",
    content: `
    <ol>
        <li><strong>Pojęcia:</strong>
            <ol type="a">
                <li><strong><em>Antysemityzm</em></strong> oznaczał niechęć, wrogość lub uprzedzenia wobec Żydów, która była wtedy mocno widoczna w społeczeństwie polskim i europejskim.</li>
                <li><strong><em>Asymilacja Żydów</em></strong> – przystosowanie i stworzenie warunków do życia dla ludności żydowskiej poprzez włączenie jej do społeczeństwa polskiego z zachowaniem odrębności kulturowej i religijnej.</li>
            </ol>
        </li>

        <li><strong>Nowela jako gatunek literacki:</strong>
            <ul>
                <li>Utwór epicki pisany prozą,</li>
                <li>Krótki i zwarty utwór,</li>
                <li>Jednowątkowość,</li>
                <li>Niewielka liczba bohaterów,</li>
                <li><em>Narrator trzecioosobowy wszechwiedzący</em>,</li>
                <li>Ścisła kompozycja – rygorystyczna budowa, zwykle: ekspozycja (wprowadzenie), zawiązanie akcji, rozwinięcie, punkt kulminacyjny, rozwiązanie akcji (puenta),</li>
                <li>Zwięzłość i brak dygresji,</li>
                <li>Puenta,</li>
                <li>Funkcja dydaktyczna lub moralna.</li>
            </ul>
        </li>

        <li><strong>Geneza noweli "Mendel Gdański" oraz kontekst historyczny:</strong><br>
            Nowela powstaje w 1890 roku na proźbę Elizy Orzeszkowej, kiedy w Polsce wzrastają ruchy <em>antysemickie</em>, a Konopnicka apeluje do Polaków o <em>asymilację</em> z ludnością żydowską.
        </li>

        <li><strong>Treść noweli "Mendel Gdański" (fragmenty):</strong>
            <ol type="a">
                <li><em>Scharakteryzuj bohaterów występujących we fragmencie:</em>
                    <ul>
                        <li><strong>Mendel Gdański</strong> jest starym Żydem, który od wielu lat mieszka i pracuje w mieście – czuje się jego częścią. Jest pracowity i uczciwy, podkreśla, że wszystko zdobył własnymi rękami. To człowiek odważny i dumny, który staje w oknie naprzeciw rozwścieczonego tłumu, broniąc swej godności.</li>
                        <li><strong>Gruby Zegarmistrz</strong> jest sąsiadem Mendla, od wielu lat go zna. Przynosi niepokojącą wieść, że „Żydów mają bić”, mówiąc o tym z pewną lekkością i obojętnością. Choć nie jest agresywny, jego słowa ujawniają stereotypy i brak głębszego współczucia wobec Żydów.</li>
                        <li><strong>Kubuś</strong> jest wnukiem Mendla, uczącym się pilnie w izbie. Jest bezbronny i niewinny, a tłum uderza właśnie w niego – kamień trafia go w głowę. Symbolizuje przyszłość i nadzieję, ale też pokazuje bezlitosne okrucieństwo napastników.</li>
                        <li><strong>Tłum</strong> jest dziki, pijany i brutalny – działa w sposób bezmyślny i okrutny. Nie kieruje się sprawiedliwością, lecz ślepą nienawiścią – atakuje wszystkich Żydów tylko za to, że są Żydami. Zamiast szacunku dla odwagi Mendla, tłum odczytuje jego postawę jako urągowisko i reaguje jeszcze większą agresją.</li>
                        <li><strong>Kobiety</strong> są bardziej wrażliwe i litościwe niż reszta tłumu. Gdy widzą Mendla w oknie z wnukiem, zaczynają płakać. Wzruszają się także losem rannego Kubusia, rzucając się ku niemu, co pokazuje ich współczucie i instynkt macierzyński.</li>
                    </ul>
                </li>
                <li><em>Opisz stosunek Polaków do Żydów:</em>
                    <ul>
                        <li><strong>Gruby zegarmistrz do starego Mendla:</strong><br>
                            Zegarmistrz zna Mendla od lat, ale mimo tego uważa, że Żydzi zasługują na pobicie tylko za to, że są Żydami.<br>
                            Mówi o tym lekko i obojętnie, jakby była to zwykła wiadomość, bez poczucia niesprawiedliwości.<br>
                            Traktuje Mendla jako obcego, mimo że ten podkreśla, iż całe życie uczciwie pracował i czuje się częścią miasta.
                        </li>
                        <li><strong>Kobiety do starego Mendla i jego wnuka Kubusia:</strong><br>
                            Gdy widzą Mendla i Kubusia w oknie, ogarnia je wzruszenie – reagują płaczem.<br>
                            Gdy Kubuś zostaje trafiony kamieniem, kobiety natychmiast biegną mu na pomoc.<br>
                            W przeciwieństwie do reszty tłumu, okazują współczucie i ludzką solidarność.
                        </li>
                        <li><strong>Tłum na ulicy do starego Mendla i Kubusia:</strong><br>
                            Tłum jest pełen nienawiści – atakuje Mendla tylko dlatego, że jest Żydem.<br>
                            Nie oszczędza nawet niewinnego dziecka – kamień trafia w głowę Kubusia.<br>
                            Odczytuje odważną postawę Mendla nie jako apel do człowieczeństwa, lecz jako zniewagę, co wyzwala jeszcze większą agresję.
                        </li>
                    </ul>
                </li>
            </ol>
        </li>

        <li><strong>Puenta noweli:</strong><br>
            Konopnicka ukazując drastyczną scenę ataku Polaków na Żyda i jego wnuka podkreśla, że <strong><em>antysemityzm</em></strong> prowadzi do nienawiści i agresji i woła o <em>asymilację</em> Polaków i Żydów, równe traktowanie i niedzielenie ludzi tylko ze względu na pochodzenie. Stary Mendel powiedział Zegarmistrzowi, że ludzi można podzielić tylko na <strong><em>dobrych i złych</em></strong>.
        </li>
    </ol>
    `
  },
  {
    subject: "Język Polski",
    date: "2025-09-03",
    topic: "Wiadomości wprowadzające do epoki pozytywizmu.",
    content: `
  <ol>
    <li>
      <strong>Pozytywizm</strong> – pojęcie pochodzi od łacińskiego słowa <em>positivus</em> 
      i oznacza: oparty na faktach, uzasadniony, użyteczny. 
      Jest to kierunek w filozofii i literaturze, zapoczątkowany przez Augusta Comte’a 
      w II połowie XIX wieku. Nazwa epoki została przyjęta od kierunku filozoficznego, 
      a główne hasło epoki to: <em>„Wiedzieć, aby przewidywać, aby móc”</em>.
    </li>
    <li>
      <strong>Czas trwania epoki:</strong>
      <ol type="a">
        <li>Początek: 1864 – upadek powstania styczniowego.</li>
        <li>Koniec: lata 1890–1895 – pojawienie się nowego pokolenia artystów.</li>
      </ol>
    </li>
    <li>
      <strong>Podstawowe kierunki w sztuce pozytywizmu:</strong>
      <ol type="a">
        <li>
          <strong>Realizm</strong> – podstawowy kierunek w sztuce pozytywizmu, 
          charakteryzujący się jak najwierniejszym odwzorowaniem rzeczywistości 
          w dziele sztuki (np. w literaturze).
        </li>
        <li>
          <strong>Naturalizm</strong> – kierunek w sztuce pozytywizmu, 
          wiernie odtwarzający ludzką naturę, ukazujący m.in. brzydotę człowieka, starość itp.
        </li>
      </ol>
    </li>
    <li>
      <strong>Podstawowe społeczne hasła pozytywizmu:</strong>
      <ol type="a">
        <li>
          <strong>Praca organiczna</strong> – pogląd zakładający, że społeczeństwo funkcjonuje 
          i rozwija się jak żywy organizm, a instytucje i grupy społeczne są ze sobą powiązane 
          jak organy w ludzkim organizmie.
        </li>
        <li>
          <strong>Praca u podstaw</strong> – praca z najniższymi warstwami społecznymi 
          poprzez podstawową edukację i podniesienie poziomu kultury, np. zakładanie szkół wiejskich, 
          aby osoby mieszkające na wsi nauczyć elementarnej wiedzy – czytania i pisania.
        </li>
        <li>
          <strong>Asymilacja Żydów</strong> – przystosowanie i stworzenie warunków do życia 
          dla ludności żydowskiej poprzez włączenie jej do społeczeństwa polskiego 
          z zachowaniem odrębności kulturowej i religijnej. 
          Przeciwieństwem asymilacji jest antysemityzm.
        </li>
        <li>
          <strong>Emancypacja kobiet</strong> – ruch społeczny dążący do równouprawnienia kobiet 
          i mężczyzn, np. poprzez przygotowanie kobiet do pracy zawodowej.
        </li>
      </ol>
    </li>
    <li>
      <strong>Filozofie pozytywistyczne:</strong>
      <ol type="a">
        <li>
          <strong>Auguste Comte</strong> – twórca scjentyzmu, głosił hasło, 
          że wiedzę o rzeczywistości dostarcza człowiekowi nauka, 
          zwłaszcza nauki przyrodnicze i socjologia.
        </li>
        <li>
          <strong>Herbert Spencer</strong> – popularyzator ewolucjonizmu Karola Darwina, 
          twierdził, że tak jak człowiek rozwija się i doskonali, 
          tak dzięki niemu rozwija się również całe społeczeństwo – twórca organicyzmu.
        </li>
        <li>
          <strong>Hipolit Taine – twórca utylitaryzmu</strong>
          Według tego poglądu wszystko, co tworzy człowiek, nawet dzieło sztuki,
          powinno być użyteczne dla drugiego człowieka, czyli mieć znaczenie społeczne. <br>
          <strong>Utylitaryzm = użyteczność.</strong>
        </li>
      </ol>
    </li>
    <li>
      <strong>Życie codzienne i wynalazki w II połowie XIX wieku</strong>
        <ul>
          <li>Nastąpiła masowa migracja ludności do miast.</li>
          <li>Pojawiły się nowe wynalazki ułatwiające życie: lampy gazowe, telegraf, telefon.</li>
          <li>Popularne stały się nowe sposoby spędzania czasu, np. chodzenie do teatru, kawiarni, czytanie gazet.</li>
          <li>Prasa rozwijała się dzięki codziennym dziennikom, tygodnikom i dwutygodnikom.</li>
          <li>Powstały nowe formy publicystyki: felieton, kronika tygodniowa, reportaż podróżniczy.</li>
          <li>W gazetach drukowano w odcinkach najbardziej znane powieści, np. <em>Lalkę</em> Bolesława Prusa.</li>
          <li>Rozwijała się medycyna: Ludwik Pasteur opracował szczepionkę przeciw wściekliźnie,
              a Maria Skłodowska-Curie odkryła promieniotwórczość.</li>
        </ul>
    </li>
    <li>
      <strong>Ubiór w II połowie XIX wieku</strong>
        <ul>
          <li><strong>Mężczyźni:</strong> garnitur, koszula, kamizelka, krawat, płaszcz, kapelusz.</li>
          <li><strong>Kobiety:</strong> gorsety, krynoliny, długie suknie, kapelusze ozdobione piórami lub woalką.</li>
          <li>Moda coraz bardziej podkreślała różnice między strojami damskimi i męskimi,
              a ubiór stawał się także wyznacznikiem statusu społecznego.</li>
        </ul>
    </li>
  </ol>
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

  filteredNotes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    noteDiv.innerHTML = `
      <button class="copy-btn" data-index="${index}">Kopiuj</button>
      <h2>${note.subject}</h2>
      <p class="date">${note.date}</p>
      <p class="topic">T: ${note.topic}</p>
      <div class="content">${note.content}</div>
    `;

    notesContainer.appendChild(noteDiv);
  });

  // Dodaj obsługę kopiowania po wyrenderowaniu notatek
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const noteContent = btn.parentElement.querySelector(".content").innerText; 
      navigator.clipboard.writeText(noteContent).then(() => {
        btn.textContent = "Skopiowano!";
        setTimeout(() => btn.textContent = "Kopiuj", 1500);
      });
    });
  });
}


// Obsługa zmiany w filtrze
subjectFilter.addEventListener("change", (e) => {
  renderNotes(e.target.value);
});

// Domyślne wyświetlenie wszystkich notatek
renderNotes("Wszystkie");
