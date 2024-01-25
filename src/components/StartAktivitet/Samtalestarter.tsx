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
      <Typography variant="h2" sx={{ mt: 5 }} color="text.primary">
        Samtalestarter
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }} color="text.secondary">
        La oss snakke om hvordan dere kan jobbe bra som et team! Gå gjennom de 3
        kortene nedenfor!
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "50%", heigh: "100px" }}>
          <CardContent>
            <Typography variant="h5">
              {samtalekortArray[samtaleIndex]}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleForrigeSamtale}
              disabled={samtaleIndex === 0}
            >
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
      </Box>
    </>
  );
};

export default Samtalestarter;
