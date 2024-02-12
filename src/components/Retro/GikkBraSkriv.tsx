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

const GikkBraSkriv = ({
  onBraSkrivFerdig,
}: {
  onBraSkrivFerdig: (disabled: boolean) => void;
}) => {
  const [braInput, setBraInput] = useState("");
  const [braListe, setBraListe] = useState<string[]>([]);

  //Hvor mye tid som er igjen og om tiden har startet
  const [tidIgjen, setTidIgjen] = useState(-1);
  const [tidStartet, setTidStartet] = useState(false);

  //Brukeren som er logget inn på og antall team medlemmer
  const { teamBruker } = useTeamContext();

  //Til å sende liste over alle bra ting
  const submitBra = (e: FormEvent) => {
    e.preventDefault();
    setBraListe([...braListe, braInput]);
    setBraInput("");
  };

  //Oppdatere staten når det skrives inn i input feltet, kan sikkert løses bedre
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBraInput(e.target.value);
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
    let intervalId: NodeJS.Timeout;
    if (tidStartet && tidIgjen > 0) {
      intervalId = setInterval(() => {
        setTidIgjen((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (tidIgjen === 0) {
      handleSettRetroTimer(false);
      // clearInterval(intervalId);
    }
    if (tidIgjen === 0 && braListe.length > 0) {
      console.log("legger til");
      handleLeggTilRetroSvar(braListe);
      handleNextStep("retroSteg");
    }
    return () => clearInterval(intervalId);
  }, [tidStartet, tidIgjen]);

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv");

      const unsubscribe = onSnapshot(retroRef, (querySnapshot) => {
        console.log(!querySnapshot.data()?.braTimerStartet, tidIgjen);
        if (querySnapshot.data()?.braTimerStartet) {
          setTidStartet(true);
          setTidIgjen(5); // 5 min (5 * 60), 5 sek for test nå
        }
      });
      return unsubscribe;
    }
  }, [teamBruker]);

  const minutes = Math.floor(tidIgjen / 60);
  const seconds = tidIgjen % 60;

  const startTimer = () => {
    handleSettRetroTimer(true);
    //Trenger kanskje egt ikke gjøre dette både her og i useEffecten
    setTidStartet(true);
    setTidIgjen(5); // 5 minutes in seconds (5 * 60)
  };

  return (
    <>
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        Hva gikk bra? - Skriv
      </Typography>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={4}>
          <Typography marginLeft={"5px"} variant="body1">
            Sett en nedtelling på 5 minutes og skriv individuelt hva som har
            gått bra i denne sprinten. Legg til så mange lapper du ønsker.
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
            }}
          >
            {tidStartet ? (
              <Typography>
                <AccessTimeIcon />
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds} igjen
              </Typography>
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
                    label="Skriv her"
                    value={braInput}
                    onChange={handleInputChange}
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
        <TavlePostIt liste={braListe} />
      </Grid>
    </>
  );
};

export default GikkBraSkriv;
