import {
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import { collection, doc } from "@firebase/firestore";
import IcebreakerSvar from "./IcebreakerSvar";
import handleIcebreakerSvar from "../../firebase/handles/handleIcebreakerSvar";
import { Auth, User, getAuth } from "firebase/auth";
import { useTeamContext } from "../../TeamContext";

interface Svar {
  id: string;
  sannhet1: string;
  sannhet2: string;
  logn: string;
}

const Icebreaker = () => {
  //Flyttes for å bruke der man skal ha truth or lies
  const [navn, setNavn] = useState("");
  const [sannhet1, setSannhet1] = useState("");
  const [sannhet2, setSannhet2] = useState("");
  const [logn, setLogn] = useState("");

  //Hvor mange som har sendt inn svar, fra unsubscribe listener
  const [svarCount, setSvarCount] = useState(0);
  //Dataen fra firebase
  const [svar, setSvar] = useState<Svar[]>([]);

  //For å sjekke om brukeren har sendt inn svarert
  const [submitted, setSubmitted] = useState(false);

  //Denne bør hentes fra et input felt i starten ellerno
  const teamMemberCount = 6;

  //Brukeren som er logget inn på
  const { teamBruker } = useTeamContext();

  //Til å hente input verdiene fra statene og sende til databasen
  const submitSvar = (e: FormEvent) => {
    e.preventDefault();

    let svar = {
      id: navn,
      personSvar: {
        sannhet1: sannhet1,
        sannhet2: sannhet2,
        logn: logn,
      },
    };
    handleIcebreakerSvar(svar);
    setSubmitted(true);

    //Tømme staten etter at det er sendt
    setNavn("");
    setSannhet1("");
    setSannhet2("");
    setLogn("");
  };

  //Oppdatere staten når det skrives inn i input feltet, kan sikkert løses bedre
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "navn":
        setNavn(value);
        break;
      case "sannhet1":
        setSannhet1(value);
        break;
      case "sannhet2":
        setSannhet2(value);
        break;
      case "logn":
        setLogn(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const icebreakerRef = doc(teamRef, "icebreaker");
      const ibSvarRef = collection(icebreakerRef, "svar");

      const unsubscribe = onSnapshot(ibSvarRef, (querySnapshot) => {
        console.log("listener, querysnapshot: ", querySnapshot);
        const newData: any[] = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setSvarCount(newData.length);
        setSvar(newData);
      });

      // Cleanup the listener when the component unmounts
      return unsubscribe;
    }
  }, [teamBruker]);

  return (
    <>
      <Typography variant="h2">2 sannheter og 1 løgn</Typography>
      {!submitted && svarCount < teamMemberCount ? (
        <>
          <form onSubmit={submitSvar}>
            <Grid
              container
              direction="column"
              spacing={2}
              alignContent="center"
            >
              <Grid item>
                <TextField
                  name="navn"
                  required
                  variant="filled"
                  label="Navnet ditt"
                  autoFocus
                  value={navn}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="sannhet1"
                  required
                  variant="filled"
                  label="En sannhet"
                  autoFocus
                  value={sannhet1}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="sannhet2"
                  required
                  variant="filled"
                  label="En sannhet"
                  autoFocus
                  value={sannhet2}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="logn"
                  required
                  variant="filled"
                  label="En løgn"
                  autoFocus
                  value={logn}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained">
                  Sendt inn
                </Button>
              </Grid>
            </Grid>
          </form>
          <div>Antall svar: {svarCount} / 6</div>
        </>
      ) : (
        <>
          {svarCount < teamMemberCount ? (
            <div>
              <Typography variant="h5">
                Venter på at de andre skal svare...
              </Typography>
              <CircularProgress />
              <div>Antall svar: {svarCount} / 6</div>
            </div>
          ) : (
            <IcebreakerSvar alleSvar={svar} />
          )}
        </>
      )}
    </>
  );
};

export default Icebreaker;
