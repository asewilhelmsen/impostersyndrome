import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import { useTeamContext } from "../../TeamContext";
import handleForrigeDilemma from "../../firebase/handles/handleForrigeDilemma";
import handleNesteDilemma from "../../firebase/handles/handleNesteDilemma";

const Dilemma = () => {
  const { teamBruker } = useTeamContext();
  const [dilemmaIndex, setDilemmaIndex] = useState(0);
  const dilemmaArray = [
    [["Lese tanker"], ["Være usynlig"]],
    [["Alltid være 1 time for sen"], ["Være to timer for tidlig"]],
    [["Aldri bli trøtt"], ["Aldri bli sulten"]],
  ];

  useEffect(() => {
    if (teamBruker) {
      const docRef = doc(firestore, teamBruker.uid, "dilemmaSteg");
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        setDilemmaIndex(querySnapshot.data()?.steg);
      });
      return unsubscribe;
    }
  }, [teamBruker]);

  const isLastSentence = dilemmaIndex === dilemmaArray.length - 1;

  return (
    <>
      <Typography variant="h2">Dilemma</Typography>
      <Typography marginLeft={"5px"} variant="body1">
        Stå opp eller sitt ned basert på hvilket valg du hadde tatt
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
        <CardContent sx={{ marginTop: "20px" }}>
          <Typography variant="body1" align="center">
            Stå opp hvis du vil:{" "}
          </Typography>

          <Typography variant="h6" align="center">
            {dilemmaArray[dilemmaIndex][0]}
          </Typography>
          <Typography variant="body1" align="center">
            Sitt ned hvis du vil:
          </Typography>
          <Typography variant="h6" align="center">
            {dilemmaArray[dilemmaIndex][1]}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ justifyContent: "space-between", marginTop: "auto" }}
        >
          <Button onClick={handleForrigeDilemma} disabled={dilemmaIndex === 0}>
            Forrige
          </Button>
          <Button
            onClick={handleNesteDilemma}
            disabled={dilemmaIndex === dilemmaArray.length - 1}
          >
            Neste
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Dilemma;
