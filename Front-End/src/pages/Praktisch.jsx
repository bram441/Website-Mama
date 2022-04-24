import React from "react";
import Navigatiebalk from "../components/Navigatiebalk";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Contact() {
  return (
    <>
      <Navigatiebalk />
      <body>
        <div className="praktisch">
          <h1>Praktisch</h1>
          <h2>Locatie:</h2>
          <section>- Baron Ruzettelaan 229, 8310 Brugge</section>
          <h2>Contact gegevens:</h2>
          <section>
            - email: sara.depreitere@gmail.com <br />- Tel: 050361073
          </section>
          <h2>Wanneer:</h2>
          <section>- Van maandag tot en met donderdag</section>
          <h2>details:</h2>
          <section>
            Meestal duurt een consultatie, zeker de eerste keer, tussen 1u en
            1,5u.
            <br />
            Er kan betaald worden met cash, via de payconiq of bancontact app
            van jouw bank.
            <br />
            Afhankelijk van de duur betaal je tussen de 40 en 70 euro per
            consult.
          </section>
          <h2>Hoe een afspraak maken?:</h2>
          <section>
            stap 1: klik op de "maak een afspraak" knop <br />
            stap 2: vul uw contact gegevens in (sommige zijn reeds automatisch
            ingevuld) <br />
            stap 3: Selecteer welke dagen u kunt <br />
            stap 4: Geef een korte beschrijving van het probleem <br />
            stap 5: druk op verzenden, er wordt zo snel mogelijk een mail <br />
            teruggestuurd met het exacte moment van de afspraak.
          </section>
        </div>
        <div className="afspraakMaken">
          <Button variant="contained">
            <Link to="/AddAppointmentForm">Maak een afspraak</Link>
          </Button>
        </div>
      </body>
    </>
  );
}
