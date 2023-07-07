# Webprogramozás JavaScript beadandó — Felvillanyozódás

Nekeresdországban Nevenincs királynak egyik szeme sír, a másik nevet. Nevet, mert végre elkészült a hatalmas kacsalábon forgó palotája, sok-sok tágas szobával és folyosóval. Ugyanakkor sír is, mert ezeket a helyiségeket be kell világítani és melegen kell tartani, azonban az aktuális rezsiemelkedés őt is érinti. Itt az ideje tehát elgondolkodni, hogy pontosan hová is helyezzünk el villanykörtéket, hogy minden megfelelően be legyen világítva; ugyanakkor csak oda helyezzünk el izzót, ahol ténylegesen szükség is van rá.

# A játék leírása
A királynak négyzet alapú szobái vannak, amelyek fekete és fehér cellákból állnak.
A fehér cellákba villanykörtéket lehet elhelyezni.
A villanykörtékből a fény átlósan nem terjed, csak az adott sor és oszlop mentén.
A fekete cellákon valamilyen tereptárgy van, ami akadályozza a fény terjedését.
A fekete cellák opcionálisan egy egész számot is tartalmazhatnak 0-tól 4-ig. Ez azt jelzi, hogy hány szomszédos (alul, felül, jobbra, balra) cella tartalmaz villanykörtét. Ha van ilyen szám, akkor be kell tartani!
Két villanykörte soha nem világíthatja meg egymást!
A játék célja a villanykörtéket úgy elhelyezni, hogy minden fehér cellát megvilágítsanak.
A játékot egy játékos játssza, amíg meg nem oldja a rejtvényt, tehát több játékos egyidejű kezeléséről vagy körökre osztásról nem kell gondoskodni.
Játékmenet példa
1. A játék kezdete. A játéktéren a pályaelemeken (alapértelmezetten fehér cellák, vagy fekete cellák számmal vagy anélkül) kívül nincs más, nincs elhelyezve egyetlen villanykörte sem.
<img width="317" alt="image" src="https://github.com/cshunor02/Light-bulb-Game/assets/104154290/b2f53f2c-52ca-4039-ae31-e70118c943a9">

2. Köztes állapot. A játékos kattintással villanykörtét helyez el, esetleg felveszi a korábban elhelyezett izzók egyikét. Vegyük észre, hogy a fény csak az izzó sorában és oszlopában terjed, illetve nem hatol át a fekete cellákon!
<img width="223" alt="image" src="https://github.com/cshunor02/Light-bulb-Game/assets/104154290/7febf63b-f271-4d03-80b1-72f27711c50a">

3. A játék vége. A játékos akkor nyert, ha minden fehér cella a játékszabályoknak megfelelően megvilágítást kap.
<img width="221" alt="image" src="https://github.com/cshunor02/Light-bulb-Game/assets/104154290/e24e7290-d838-4f95-a196-24cb570562f4">

4. Példa helytelen megoldásra
Az alábbi megoldás helytelen (attól függetlenül, hogy valóban minden fehér cella megvilágításra került), mert két villanykörte egymást is megvilágítja!

<img width="223" alt="image" src="https://github.com/cshunor02/Light-bulb-Game/assets/104154290/7015f835-9df2-418c-b8ff-bc8e35b59d65">

# A játék megvalósítása
Legyen egy pályaválasztó, amely az alábbi funkciókat látja el:

- megjeleníthető a játék rövid leírása
- ki lehet választani, hogy az elérhető (előre felvett) pályák közül melyiken szeretnénk játszani
- megadható a játékos neve
- láthatók a korábbi játékok eredményei
- folytatható a félbehagyott játék (ha van)
- megnyitható a pályaszerkesztő felületet (pluszpontos feladat)

Illetve ezen kívül létezik még maga a játéktér, ahol a játék történik:

- megjelennek az adott pályához tartozó elemek (pl. megfelelő méretű táblázatban, de más megjelenítés is használható, lásd később a segítséget)
- kattintással felhelyezhetők vagy levehetők villanykörték
- ellenőrizhető (gombbal vagy akár automatikusan) a megoldás helyessége
- a játék menthető vagy újrakezdhető

### Figyelem! Ezek nem külön oldalak, hanem csak megjelenített vagy elrejtett panelek. Az egész játék egyetlen HTML oldalon legyen!

# Mintapályák
Az alábbi három táblázatban egy-egy nehézségi fokozathoz tartozó kiinduló táblát mutatunk be. Természetesen lehet más elrendezésekben gondolkodni, de minden esetben legyen rajta kellő számú fekete cella, és azok közül néhányban számok is. Ha jól paraméterezed a feladatot, akkor csak egy megoldása lesz a rejtvénynek.

1. Könnyű 7x7-es pálya:

<img width="221" alt="image" src="https://github.com/cshunor02/Light-bulb-Game/assets/104154290/c690e3fb-4a47-42ff-89ce-d6f510f5f9f4">

2. Haladó 7x7-es pálya:

<img width="222" alt="image" src="https://github.com/cshunor02/Light-bulb-Game/assets/104154290/5135d718-580f-4ca8-a064-76dfa3459b05">

3. Extrém 10x10-es pálya:

<img width="310" alt="image" src="https://github.com/cshunor02/Light-bulb-Game/assets/104154290/9f2a0c5c-7863-489a-a632-e5908bfcea66">

# Megjelenés
Fontos az igényes megjelenés. Ez nem feltétlenül jelenti egy agyon csicsázott oldal elkészítését, de azt igen, hogy 1024x768 felbontásban és afölött az elrendezés jól jelenjen meg, a játéktábla négyzetes cellákat tartalmazzon. Ehhez lehet minimalista designt is alkalmazni, lehet különböző háttérképekkel és grafikus elemekkel felturbózott saját CSS-t készíteni, de lehet bármilyen CSS keretrendszer segítségét is igénybe venni.

Nincs elvárás arra vonatkozóan, hogy milyen technológiával (táblázat, div-ek vagy canvas) oldod meg a feladatot, továbbá a megjelenést és működést illetően sincsenek kőbe vésett elvárások. A lényeg, hogy a fenti feladatok felismerhetők legyenek, és a játék jól játszható legyen.

# Pontozás
A feladat megoldásával 20 pont szerezhető. Vannak minimum elvárások, melyek teljesítése nélkül a beadandó nem elfogadható. A plusz feladatokért további 5 pont szerezhető. Ha valaki mindent megold, a beadandóra akár 25 pontot is kaphat.

A gyakorlati jegyszerzés JavaScript beadandóhoz kapcsolódó feltételei: minden minimumkövetelmény teljesítése ÉS a késésre járó pontlevonás után is legalább 8 pont (40%) elérése. (Halogatás előtt tehát érdemes lehet megfontolni, hogy mi az egyszerűbb: határidőre elkészíteni a minimális követelményeknek megfelelő verziót; vagy két héttel később maxpont fölötti verzióra ugyanúgy 8 pontot kapni a levonás miatt.)

### Minimálisan teljesítendő (enélkül nem fogadjuk el, 8 pont)
- Játéktér: egy pálya elemei helyesen megjelennek (1 pont)
- Játéktér: a fehér cellákra kattintással villanykörte helyezhető el (1 pont)
- Játéktér: a korábban elhelyezett villanykörte kattintással el is távolítható (1 pont)
- Játéktér: a fekete cellákra nem lehet villanykörtét elhelyezni (1 pont)
- Játéktér: a játék detektálja (automatikusan vagy gombra kattintva), ha az elkészített megoldás helyes (3 pont)
- Játéktér: helyes megoldás után a játék újrakezdhető az oldal újratöltése nélkül (1 pont)
### Az alap feladatok (12 pont)
- Pályaválasztó: legalább három különböző előre elkészített pálya közül lehet választani, és a kiválasztott pálya helyesen elindul (1 pont)
- Pályaválasztó: megadható a játékos neve, amely a játékoldalon és mentéskor megjelenik (1 pont)
- Játéktér: játék közben folyamatosan látható az eltelt idő (1 pont)
- Játéktér: minden megvilágított (vagy villanykörtét tartalmazó) fehér cella sárga háttérszínnel jelenik meg (1 pont)
- Játéktér: a fény terjedése animációval történik, vagyis látható, hogy milyen sorrendben kapnak sárga háttérszínt az egyes cellák a villanykörtétől távolodva (1 pont)
- Játéktér: külön stílussal (pl. zöld szövegszín) jelenik meg, ha egy fekete cellát a beleírt számnak megfelelő számú villanykörte határol (1 pont)
- Játéktér: külön stílussal (pl. piros szín vagy ikon) jelenik meg, ha két villanykörte egymást megvilágítja (1 pont)
- Játéktér: a játék menet közben megszakítható és menthető (1 pont)
- Pályaválasztó: láthatók a legutóbbi játékok eredményei: játékos neve, pálya neve, teljesítés ideje (1 pont)
- Pályaválasztó: a legutóbbi játékok eredményei megmaradnak az oldal bezárása után is (1 pont)
- Pályaválasztó: a pályaválasztó oldalon látszik, ha van mentett játék, és ez a játék helyesen betölthető (1 pont)
- Egyéb: igényes kialakítás (1 pont)
- Késés: -0,5 pont / megkezdett nap!
