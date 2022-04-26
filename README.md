# Odlarn

Odlarn är ett planeringsverktyg för odlare. Målet med verktyget är att skapa en överblick över de moment som skall utföras under odlingsåret.

## Applikation
Användare lägger till de växter/grödor som planeras odlas i en lista och anger information så som såtid, grotid etc. I en kalender visas sedan när de olika momenten skall utföras för att generera en lyckad skörd.

## Applikationsflöde
App.js initieras av main.js när applikation startas. 

I App.js deklareras funktioner som används i CropsView.js, där UI hanteras. 
I CropsAPI.js deklareras funktioner som används i App.js.

## Att implementera/vidareutveckla
* Intuitiv funktion för att radera gröda (ex. lägg till knapp i modal eller i list-objektet istället för nuvarande högerklick).
* Vid klick på "Ny gröda" --> öppna grödans modal.
* Förbättra placering av "Spara"-knapp så att denna inte hamnar halvt utanför modal-rutan i vissa lägen.
* Var konsekvent med fetmarkering av "akutell gröda", dvs. ändra så att nyss sparad gröda är fetmarkerad efter att modalen stängts vid klick på "Spara".
* Ändra input-fälten "såtid" och "skördas" till dropdown-kalender.
* Ändra input-fältet "Förkultiveras" till dropdown.
* Ändra inputfältet "Grotid" till nummerfält & förtydliga enhet (dagar)
* Skapa kalender som hämtar data kring samtliga moment och gör markeringar i kalendern utifrån dessa (skall uppdateras automagiskt vid varje ändring).
* Skapa publik databas över växter/grödor med odlingsanvisningar för svenskt klimat. Lägg till sökfunktion i Odlarn för att hämta växter/grödor från databasen.
* Lägg till användarfunktion för att lägga till nya eller redigera befintliga växter/grödor i databasen.
* Snygga till UI




