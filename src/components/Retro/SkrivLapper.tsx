import { Typography, TextField, Grid, Button } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import handleSettRetroTimer from "../../firebase/handles/handleSettRetroTimer";
import handleLeggTilRetroSvar from "../../firebase/handles/handleLeggTilRetroSvar";
import TavlePostIt from "./TavlePostIt";
import handleNextStep from "../../firebase/handles/handleNextStep";

const SkrivLapper = ({
  overskrift,
  forklaring,
  aktivitet,
  onSkrivFerdig,
}: {
  overskrift: string;
  forklaring: string;
  aktivitet: string;
  onSkrivFerdig: (disabled: boolean) => void;
}) => {
  const [input, setInput] = useState("");
  const [liste, setListe] = useState<string[]>([]);

  //Hvor mye tid som er igjen og om tiden har startet
  const [tidIgjen, setTidIgjen] = useState(-1);
  const [tidStartet, setTidStartet] = useState(false);

  //Brukeren som er logget inn på og antall team medlemmer
  const { teamBruker, retroNummer } = useTeamContext();

  //Konstanter for å regne ut minutter og sekunder av tiden på timeren
  const minutes = Math.floor(tidIgjen / 60);
  const seconds = tidIgjen % 60;

  //Til å sende liste over alle bra ting
  const submitBra = (e: FormEvent) => {
    e.preventDefault();
    setListe([...liste, input]);
    setInput("");
  };

  //Oppdatere staten når det skrives inn i input feltet, kan sikkert løses bedre
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  //For at man kan klikke enter for å legge til
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitBra(e);
    }
  };

  // Timer funksjonalitet
  useEffect(() => {
    onSkrivFerdig(!tidStartet || tidIgjen > 0);
    let intervalId: NodeJS.Timeout;
    if (tidStartet && tidIgjen > 0) {
      intervalId = setInterval(() => {
        setTidIgjen((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (tidIgjen === 0) {
      handleSettRetroTimer(retroNummer, false);
      // clearInterval(intervalId);
    }
    if (tidIgjen === 0 && liste.length > 0) {
      handleLeggTilRetroSvar(retroNummer, liste, aktivitet);
      if (aktivitet === "braPostIts") {
        handleNextStep("retroSteg", 3);
      } else if (aktivitet === "bedrePostIts") {
        handleNextStep("retroSteg", 5);
      }
    }
    return () => clearInterval(intervalId);
  }, [tidStartet, tidIgjen]);

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv" + retroNummer);

      const unsubscribe = onSnapshot(retroRef, (querySnapshot) => {
        if (querySnapshot.data()?.timerStartet) {
          setTidStartet(true);
          setTidIgjen(5); // 5 min (5 * 60), 5 sek for test nå
        }
      });
      return unsubscribe;
    }
  }, [teamBruker]);

  const startTimer = () => {
    handleSettRetroTimer(retroNummer, true);
    //Trenger kanskje egt ikke gjøre dette både her og i useEffecten
    //setTidStartet(true);
    //setTidIgjen(5); // 5 minutes in seconds (5 * 60)
  };

  return (
    <>
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        {overskrift}
      </Typography>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={4}>
          <Typography marginLeft={"5px"} variant="body1">
            {forklaring}
          </Typography>
          <br></br>
          <Typography marginLeft={"5px"} variant="body2">
            Svarene vil deles anonymt og du kan ikke legge inn flere når tiden
            er ute.
          </Typography>
          <Grid
            item
            sx={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {tidStartet ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon color="primary" fontSize="large" />
                <Typography
                  variant="h5"
                  sx={{ marginLeft: "10px", marginTop: "5px" }}
                >
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds} igjen
                </Typography>
              </div>
            ) : (
              <Button
                onClick={startTimer}
                variant="contained"
                disabled={tidStartet}
              >
                Start timer
              </Button>
            )}
          </Grid>
          {tidStartet ? (
            <form onSubmit={submitBra}>
              <Grid
                container
                spacing={6}
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: "50px" }}
              >
                <Grid item>
                  <TextField
                    name="bra"
                    required
                    variant="outlined"
                    autoFocus
                    value={input}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 26 }}
                    error={input.length > 25}
                    label={
                      input.length > 25 ? "Maks 25 karakterer" : "Skriv her"
                    }
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    Legg til
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <div></div>
          )}
        </Grid>
        <TavlePostIt liste={liste} />
      </Grid>
    </>
  );
};

export default SkrivLapper;
