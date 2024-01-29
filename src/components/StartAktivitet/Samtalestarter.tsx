import {
  Typography,
  Button,
  Card,
  Box,
  CardContent,
  CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import handleNesteSamtale from "../../firebase/handles/handleNesteSamtale";
import handleForrigeSamtale from "../../firebase/handles/handleForrigeSamtale";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import { useTeamContext } from "../../TeamContext";

const Samtalestarter = () => {
  const { teamBruker } = useTeamContext();
  const [samtaleIndex, setSamtaleIndex] = useState(0);
  const samtalekortArray = [
    "Hvordan tror dere teamarbeid påvirker følelsen av imposter syndrome?",
    "Har dere noen gang følt på imposter syndrome i noen settinger?",
    "Hva kan dere gjøre for å minske imposter følelsene på teamet?",
    "Dere har fullført alle samtalekortene! ",
  ];

  useEffect(() => {
    //Kan kanskje flyttes til egen fil ettersom det brukes flere steder nå
    if (teamBruker) {
      const docRef = doc(firestore, teamBruker.uid, "startAktivitetSteg");
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        setSamtaleIndex(querySnapshot.data()?.samtaleSteg);
      });
      return unsubscribe;
    }
  }, [teamBruker]);

  return (
    <>
      <Typography variant="h2">Samtalestarter</Typography>
      <Typography marginLeft={"5px"} variant="body2">
        La oss snakke om hvordan dere kan jobbe bra som et team! Gå gjennom de 3
        kortene sammen og diskuter!
      </Typography>

      <Card
        sx={{
          maxWidth: 400,
          margin: "auto",
          height: 220,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ marginTop: "15px" }}>
          <Typography variant="h5" align="center">
            {samtalekortArray[samtaleIndex]}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ justifyContent: "space-between", marginTop: "auto" }}
        >
          <Button onClick={handleForrigeSamtale} disabled={samtaleIndex === 0}>
            Forrige
          </Button>
          <Button
            onClick={handleNesteSamtale}
            disabled={samtaleIndex === samtalekortArray.length - 1}
          >
            Neste
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Samtalestarter;
