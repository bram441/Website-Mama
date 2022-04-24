import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useSession } from "../context/UserProvider";
import Navigatiebalk from "../components/Navigatiebalk";
import { Link } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function AddAppointmentForm() {
  const [state, handleSubmit] = useForm("xzbobpdg");
  const { user } = useSession();
  const history = useHistory();
  const [dag1, setDag1] = useState(null);
  const [dag2, setDag2] = useState(null);
  const [dag3, setDag3] = useState(null);
  const [dag4, setDag4] = useState(null);
  const [dag5, setDag5] = useState(null);
  const [dag6, setDag6] = useState(null);
  const [dag7, setDag7] = useState(null);
  const [dag8, setDag8] = useState(null);
  const [dag9, setDag9] = useState(null);
  const [voornaam, setVoornaam] = useState(null);
  const [achternaam, setAchternaam] = useState(null);
  const [email, setEmail] = useState(null);

  const handleCancel = () => {
    history.replace("/Praktisch");
  };

  useEffect(() => {
    let vandaag = new Date();
    let m = vandaag.getMonth() + 1;
    const days = [
      "Zondag",
      "Maandag",
      "Dinsdag",
      "Woensdag",
      "Donderdag",
      "Vrijdag",
      "Zaterdag",
    ];
    let aantalDagen = 0;
    let dag = vandaag.getDay() + 1;
    let date = vandaag.getDate() + 1;
    for (let i = 1; aantalDagen < 11; i++) {
      if (dag > 4) {
        dag = 1;
        date += 2;
      }
      if (i === 1) {
        setDag1(`${days[dag]} ${date}/${m}`);
      } else if (i === 2) {
        setDag2(`${days[dag]} ${date}/${m}`);
      } else if (i === 3) {
        setDag3(`${days[dag]} ${date}/${m}`);
      } else if (i === 4) {
        setDag4(`${days[dag]} ${date}/${m}`);
      } else if (i === 5) {
        setDag5(`${days[dag]} ${date}/${m}`);
      } else if (i === 6) {
        setDag6(`${days[dag]} ${date}/${m}`);
      } else if (i === 7) {
        setDag7(`${days[dag]} ${date}/${m}`);
      } else if (i === 8) {
        setDag8(`${days[dag]} ${date}/${m}`);
      } else if (i === 9) {
        setDag9(`${days[dag]} ${date}/${m}`);
      }
      aantalDagen++;
      dag++;
      date++;
    }
  }, []);

  useEffect(() => {
    if (user != null) {
      setVoornaam(user.voornaam);
      setAchternaam(user.achternaam);
      setEmail(user.email);
    }
  }, [user]);

  if (state.succeeded) {
    return (
      <>
        <Navigatiebalk />
        <Alert variant="standard" severity="success">
          Afspraak aangevraagd, we sturen u zo snel mogelijk een mail terug met
          de exacte dag en tijdstip!
        </Alert>
        <div className="backHome">
          <Button variant="contained">
            <Link to="/">Terug naar Home</Link>
          </Button>
        </div>
      </>
    );
  }
  return (
    <div className="afspraak">
      <Navigatiebalk />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <form onSubmit={handleSubmit}>
            <h2 className="active">Maak een afspraak</h2>
            <input
              id="voornaam"
              type="text"
              name="voornaam"
              placeholder="voornaam"
              value={voornaam}
              required
            />
            <ValidationError
              prefix="Voornaam"
              field="voornaam"
              errors={state.errors}
            />
            <input
              id="achternaam"
              type="text"
              name="achternaam"
              placeholder="achternaam"
              value={achternaam}
              required
            />
            <ValidationError
              prefix="Achternaam"
              field="achternaam"
              errors={state.errors}
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <br />
            <h2 className="active">Welke dagen kan je?</h2>
            <br />
            <div id="formDagen">
              {/* dag1 */}

              <label for={dag1}> {dag1} </label>
              {/*<input type="checkbox" id={dag1} name={dag1} value={dag1} />*/}
              <br />
              <div>
                <input type="radio" id={dag1} name={dag1} value="voormiddag" />
                <label for="child">Voormiddag</label>
                <input type="radio" id={dag1} name={dag1} value="namiddag" />
                <label for="adult">Namiddag</label>
                <input type="radio" id={dag1} name={dag1} value="heel de dag" />
                <label for="senior">Heel de dag</label>
              </div>
              <br />
              {/* dag2 */}

              <label for={dag2}> {dag2} </label>
              {/*<input type="checkbox" id={dag2} name={dag2} value={dag2} />*/}
              <br />
              <input type="radio" id={dag2} name={dag2} value="voormiddag" />
              <label for="child">Voormiddag</label>
              <input type="radio" id={dag2} name={dag2} value="namiddag" />
              <label for="adult">Namiddag</label>
              <input type="radio" id={dag2} name={dag2} value="heel de dag" />
              <label for="senior">Heel de dag</label>
              <br />
              <br />

              {/* dag3 */}

              <label for={dag3}> {dag3} </label>
              {/*<input type="checkbox" id={dag3} name={dag3} value={dag3} />*/}
              <br />
              <input type="radio" id={dag3} name={dag3} value="voormiddag" />
              <label for="child">Voormiddag</label>
              <input type="radio" id={dag3} name={dag3} value="namiddag" />
              <label for="adult">Namiddag</label>
              <input type="radio" id={dag3} name={dag3} value="heel de dag" />
              <label for="senior">Heel de dag</label>
              <br />
              <br />

              {/* dag4 */}

              <label for={dag4}> {dag4} </label>
              {/*<input type="checkbox" id={dag4} name={dag4} value={dag4} />*/}
              <br />
              <input type="radio" id={dag4} name={dag4} value="voormiddag" />
              <label for="child">Voormiddag</label>
              <input type="radio" id={dag4} name={dag4} value="namiddag" />
              <label for="adult">Namiddag</label>
              <input type="radio" id={dag4} name={dag4} value="heel de dag" />
              <label for="senior">Heel de dag</label>
              <br />
              <br />

              {/* dag5 */}

              <label for={dag5}> {dag5} </label>
              {/*<input type="checkbox" id={dag5} name={dag5} value={dag5} />*/}
              <br />
              <input type="radio" id={dag5} name={dag5} value="voormiddag" />
              <label for="child">Voormiddag</label>
              <input type="radio" id={dag5} name={dag5} value="namiddag" />
              <label for="adult">Namiddag</label>
              <input type="radio" id={dag5} name={dag5} value="heel de dag" />
              <label for="senior">Heel de dag</label>
              <br />
              <br />

              {/* dag6 */}

              <label for={dag6}> {dag6} </label>
              {/*<input type="checkbox" id={dag6} name={dag6} value={dag6} />*/}
              <br />
              <input type="radio" id={dag6} name={dag6} value="voormiddag" />
              <label for="child">Voormiddag</label>
              <input type="radio" id={dag6} name={dag6} value="namiddag" />
              <label for="adult">Namiddag</label>
              <input type="radio" id={dag6} name={dag6} value="heel de dag" />
              <label for="senior">Heel de dag</label>
              <br />
              <br />

              {/* dag7 */}

              <label for={dag7}> {dag7} </label>
              {/*<input type="checkbox" id={dag7} name={dag7} value={dag7} />*/}
              <br />
              <input type="radio" id={dag7} name={dag7} value="voormiddag" />
              <label for="child">Voormiddag</label>
              <input type="radio" id={dag7} name={dag7} value="namiddag" />
              <label for="adult">Namiddag</label>
              <input type="radio" id={dag7} name={dag7} value="heel de dag" />
              <label for="senior">Heel de dag</label>
              <br />
              <br />

              {/* dag8 */}

              <label for={dag8}> {dag8} </label>
              {/*<input type="checkbox" id={dag8} name={dag8} value={dag8} />*/}
              <br />
              <input type="radio" id={dag8} name={dag8} value="voormiddag" />
              <label for="child">Voormiddag</label>
              <input type="radio" id={dag8} name={dag8} value="namiddag" />
              <label for="adult">Namiddag</label>
              <input type="radio" id={dag8} name={dag8} value="heel de dag" />
              <label for="senior">Heel de dag</label>
              <br />
              <br />

              {/* dag9 */}

              <label for={dag9}> {dag9} </label>
              {/*<input type="checkbox" id={dag9} name={dag9} value={dag9} />*/}
              <br />
              <input type="radio" id={dag9} name={dag9} value="voormiddag" />
              <label for="child">Voormiddag</label>
              <input type="radio" id={dag9} name={dag9} value="namiddag" />
              <label for="adult">Namiddag</label>
              <input type="radio" id={dag9} name={dag9} value="heel de dag" />
              <label for="senior">Heel de dag</label>
              <br />
              <h6>
                *Indien u niet kunt deze dagen of een afspraak wilt maken verder
                in de toekomst stuur dan een mailtje naar{" "}
                <u>sara.depreitere@gmail.com</u> of meld dit in het{" "}
                <u>opmerkingen</u> vakje
              </h6>
            </div>
            <h2 className="active">Beschrijf kort uw probleem</h2>
            <br />
            <textarea id="probleem" name="probleem" required />
            <ValidationError
              prefix="probleem"
              field="probleem"
              errors={state.errors}
            />
            <br />
            <h2 className="active">Opmerkingen</h2>
            <br />
            <textarea id="Opmerkingen" name="Opmerkingen" />
            <ValidationError
              prefix="Opmerkingen"
              field="Opmerkingen"
              errors={state.errors}
            />
            <input type="submit" disabled={state.submitting} />
            <input type="reset" value="Reset" />
          </form>
          <div id="formFooter">
            <button className="underlineHover" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
