# Szín- és RGB-tippelő Játék
**Régi fiókból visszaállítva**

Angular CLI-val készült színtippelő játék a *Webprogramozás 2* kurzusra.

Két játék érhető el:
* a **Színtippelő Játék** egy RGB értéket mutat, és a felhasználónak a 12 válaszlehetőség közül kell kiválasztania a helyes színkockát.
* az **RGB-tippelő Játék** egy színt mutat, és a felhasználónak kell kitalálnia az RGB értékeket. A játék nehézsége miatt megengedett 30 pont eltérés.

A program célja, hogy egyszerű, de szórakoztató élményt nyújtson a felhasználóknak, és erősítse az RGB-értékekkel kapcsolatos kézségét.
## Design
A weboldal egy alap háttérrel rendelkezik, amely betölti a különböző játékokat.
### Színtippelő játék
![cgg](https://github.com/figuranna/color-guessing-game/assets/101461379/bd87a45d-9b96-4627-add4-14fb34f7e9ef)
### RGB-tippelő játék
![rgbgg](https://github.com/figuranna/color-guessing-game/assets/101461379/6b5f5ddb-5354-4ba5-ad3a-791c59b1ff2a)

## Szerkezet
Igyekeztem a szerkezetet egyszerűen bővíthetőre csinalni, hogy akár más játékokat és funkciókat is könnyen be lehessen vezetni később.
### Alap
Mint fentebb említettem, a programnak van egy alapja ahova betölti a játékokat. Itt található a a *szürke doboz* és a *két gomb* található. (*A két oldalválasztó gomb dizájnja lehetne jobb is, de egyik próbált megoldás se tetszett annyira*)

* app.component.html
* app.component.css
* app.component.ts

  *  *constructor*
  *  *checkMode()*: Ellenőrzi, hogy a felhasználó melyik játékot választotta. Az alapértelmezett játék a **Színtippelő Játék**.
### Színtippelő
Az RGB érték a képernyő tetején jelenik meg, és alatta 12 kocka található. A mezőre kattintva tippelhető meg az adott szín. Ha a tipp helyes, az alap fehér háttére az adott, nyertes színre vált, és többé nem kattinthatók a mezők. Ha a tipp helytelen, akkor a kattintott mező eltűnik és folytatódik a játék.

* game.component.html
* game.component.css
* game.component.ts
  
  * *Color interface*: Az RGB értékek tárolására lett létrehozva. Két különböző típusú string, valamint az adott érték láthatóságának megadása lehetséges
  * *constructor*: a konstruktor üres, mert a *setupGame()* hasonlóan szerepet lát el
  * *setupGame()*: Visszaállítja a játékot az eredeti állapotába, valamelyest konstruktorként működik
  * *generateRandomColor()*: Véletlenszerű RGB értéket generál
  * *generateRandomColors(hány kockát szeretnénk)*: Egy szín tömböt generál a *numberOfOptions* változó alapján
  * *updateVisibleColors() & updateGameStatusAfterWin() & handleIncorrectGuess()*: Főleg az megjelenített értékek kinézetéért és kezeléséért felelős
  * *checkColor()*: A fentebb említett funkciókat használja a tippek ellenőrzésre
### RGB-tippelő
A tippelhető szín a képernyő közepén jelenik meg, és alatta adhatod meg a gondolt értékeket. Ha mind a 3 értéket nagyjából helyesen tippeljük, akkor a háttér a megadott színre változik, hasonlóan a másik játékhoz. Ha helytelenül tippelsz akkor új értékeket adhatsz meg vagy módosíthatod a korábbiakat. Ha meguntad a helytelen tippelést, akkor megfordíthatod a kártyát, hogy megnézd a pontos RGB értéket a megjelenített színhez.

* rgb.component.html
* rgb.component.css
* rgb.component.ts

  * *Color interface*: Az RGB értékek tárolására lett létrehozva. Két különböző típusú string megadása lehetséges
  * *constructor*: a konstruktor üres, mert a *setupGame()* hasonlóan szerepet lát el
  * *setupGame()*: Visszaállítja a játékot az eredeti állapotába, valamelyest konstruktorként működik
  * *generateRandomColor()*: Véletlenszerű RGB értéket generál
  * *inputHandling()*: Az input mező miatt szükséges egy kezelő funkció, hogy kiszűrje a User hibákat és biztosítsa, hogy csak megfelelő értékek mennek tovább a többi függvénynek
  * *toggleFlip()*: Felelős a kártya megfordításáért
  * *isWithinRange()*: Ellenőrzi, hogy a megadott számok a +-30 tartományon belül vannak-e
  * *handleIncorrectGuess()*: Főleg az megjelenített értékek kinézetéért és kezeléséért felelős
  * *checkColor()*: Ellenőrzi, hogy helyesen tippelted-e az értékeket
