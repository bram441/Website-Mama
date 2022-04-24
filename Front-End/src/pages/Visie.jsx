import React from "react";
import Navigatiebalk from "../components/Navigatiebalk";

export default function Visie() {
  return (
    <div className="Visie">
      <Navigatiebalk />
      <div className="visie_uitleg">
        <h1>Visie</h1>
        <p>
          Mijn visie op ziekte en gezondheid is al een stukje uitgelegd op de
          hoofdpagina. De "mind" is voor mij de krachtigste tool die we hebben,
          die ons lichaam heel sterk beïnvloedt. <br />
          Ook het lichaam beïnvloedt de geest. Als bv je lever overbelast is of
          je darmen zijn niet in orde, dan hebben die ook invloed op de psyche.
        </p>
        <p>
          Vandaar ook mijn totaal aanpak. Ik blijf zoeken naar de meest passende
          homeopatische remedie, bij wie jij bent, lichamelijk en psychisch en
          daarnaast geef ik nog steeds ondersteunend fytotherapie en/of
          voedingssupplementen.
        </p>
        <p>
          Maar zo nodig combineer ik dit met coaching, probeer ik samen met jou
          te zoeken naar denkpatronen die niet voedend zijn voor jou en je
          lichaam, maar die je eerder ziek maken. En samen kijken we of je daar
          iets aan kan veranderen. Als je graag meer leest over dit onderwerp,
          zijn er verschillende boeken die daar over uitbreiden.
        </p>
      </div>
      <div className="suggesties">
        <h4>Hieronder een aantal suggesties:</h4>
        <p>
          -Lisa Rankin: Mind over medicine / Meer brein, minder medicijn. The
          fear cure.
        </p>
        <p>-Gabor Maté: When the body says no / Wanneer je lichaam nee zegt.</p>
        <p>
          -Stephan Hausner: Zelfs als het mijn leven kost (systeemopstelllingen
          met ziekten en aanhoudende symptomen).
        </p>
        <p>
          -Anita Moorjani: Dying to be me/ Ik moest doodgaan om mezelf te
          genezen. What if this is heaven/ Wat als dit de hemel is?
        </p>
        <p>-Christiane Beerlandt: De sleutel tot zelfbevrijding.</p>
        <p>-Lise Bourbeau: Je lichaam zegt: hou van jezelf.</p>
      </div>
    </div>
  );
}
