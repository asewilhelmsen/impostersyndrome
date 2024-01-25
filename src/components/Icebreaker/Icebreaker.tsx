import {
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import { collection, doc } from "@firebase/firestore";
import IcebreakerSvar from "./IcebreakerSvar";
import handleIcebreakerSvar from "../../firebase/handles/handleIcebreakerSvar";
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

  //Brukeren som er logget inn på og antall team medlemmer
  const { teamBruker, teamAntall } = useTeamContext();

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
      {!submitted && svarCount < teamAntall ? (
        <>
          <Typography variant="body1" color="text.secondary">
            2 sannheter og 1 løgn er en icebreaker-øvelse for at dere skal bli
            litt bedre kjent før vi setter i gang.
          </Typography>
          <Typography variant="body1" sx={{ mb: 5 }} color="text.secondary">
            Skriv inn 2 sannheter og 1 løgn om deg selv så skal de andre
            medlemmene gjette hva som er løgnen din senere!
          </Typography>
          <form onSubmit={submitSvar}>
            <Grid
              container
              direction="column"
              spacing={4}
              justifyContent="center"
              alignItems={"center"}
            >
              <Grid item>
                <InputLabel
                  sx={{
                    color: "text.primary",
                  }}
                >
                  Navnet ditt
                </InputLabel>
                <TextField
                  name="navn"
                  required
                  variant="outlined"
                  autoFocus
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                  }}
                  value={navn}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                container
                item
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Grid item xs={6} sm={3}>
                  <InputLabel
                    sx={{
                      color: "text.primary",
                    }}
                  >
                    Første sannhet
                  </InputLabel>
                  <TextField
                    name="sannhet1"
                    required
                    variant="outlined"
                    autoFocus
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                    value={sannhet1}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={6} sm={3}>
                  <InputLabel
                    sx={{
                      color: "text.primary",
                    }}
                  >
                    Andre sannhet
                  </InputLabel>
                  <TextField
                    name="sannhet2"
                    required
                    variant="outlined"
                    autoFocus
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                    value={sannhet2}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <InputLabel
                    sx={{
                      color: "text.primary",
                    }}
                  >
                    En løgn
                  </InputLabel>
                  <TextField
                    name="logn"
                    required
                    variant="outlined"
                    autoFocus
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                    value={logn}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained">
                  Send inn
                </Button>
              </Grid>
              <Grid item>
                Antall svar: {svarCount} / {teamAntall}
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
        <>
          {svarCount < teamAntall ? (
            <Grid
              container
              direction="column"
              spacing={4}
              alignItems={"center"}
              sx={{ marginTop: "5px" }}
            >
              <Grid item>
                <Typography variant="h6">
                  Venter på at de andre skal svare...
                </Typography>
              </Grid>
              <Grid item>
                <CircularProgress />
              </Grid>
              <Grid item>
                <Typography variant="h5">
                  Antall svar: {svarCount} / {teamAntall}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <IcebreakerSvar alleSvar={svar} />
          )}
        </>
      )}
    </>
  );
};

export default Icebreaker;
