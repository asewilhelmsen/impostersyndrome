import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import handleNesteSamtale from "../../firebase/handles/handleNesteSamtale";
import handleForrigeSamtale from "../../firebase/handles/handleForrigeSamtale";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import { useTeamContext } from "../../TeamContext";

const Samtalestarter = ({
  onSamtaleFerdig,
}: {
  onSamtaleFerdig: (disabled: boolean) => void;
}) => {
  const { teamBruker } = useTeamContext();
  const [samtaleIndex, setSamtaleIndex] = useState(0);
  const samtalekortArray = [
    "Hvordan tror dere teamarbeid påvirker følelsen av Imposter syndrome?",
    "Ta en runde der hver person deler sine styrker og svakheter i et teamprosjekt",
    "Hva kan dere gjøre for å håndtere Imposter syndrome på teamet?",
    "Dere har fullført alle samtalekortene 👏🏼",
  ];

  useEffect(() => {
    //Kan kanskje flyttes til egen fil ettersom det brukes flere steder nå
    if (teamBruker) {
      const docRef = doc(firestore, teamBruker.uid, "startAktivitetSteg");
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        setSamtaleIndex(querySnapshot.data()?.samtaleSteg);
        onSamtaleFerdig(querySnapshot.data()?.samtaleSteg < 3);
      });
      return unsubscribe;
    }
  }, [teamBruker]);

  const isLastSentence = samtaleIndex === samtalekortArray.length - 1;

  return (
    <>
      <Typography variant="h2">Dele tanker og erfaringer</Typography>
      <Typography marginLeft={"5px"} variant="body1">
        Gå felles gjennom de 3 kortene og del kort hva dere tenker!
      </Typography>

      <Card
        sx={{
          maxWidth: 400,
          margin: "auto",
          marginTop: "4%",
          height: 230,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ marginTop: "30px" }}>
          <Typography
            variant="h5"
            align="center"
            style={isLastSentence ? { color: "#77BC6B" } : {}}
          >
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
