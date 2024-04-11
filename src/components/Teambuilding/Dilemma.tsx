import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import { useTeamContext } from "../../TeamContext";
import handleForrigeDilemma from "../../firebase/handles/handleForrigeDilemma";
import handleNesteDilemma from "../../firebase/handles/handleNesteDilemma";

const Dilemma = ({
  onLukk,
  onFullfor,
}: {
  onLukk: () => void;
  onFullfor: () => void;
}) => {
  const { teamBruker } = useTeamContext();
  const [dilemmaIndex, setDilemmaIndex] = useState(0);
  const dilemmaArray = [
    [
      ["Høre på den samme sangen resten av livet "],
      ["Se på den samme filmen resten av livet"],
    ],
    [["Lese tanker"], ["Være usynlig"]],
    [["Alltid være 1 time for sen"], ["Alltid være to timer for tidlig"]],
    [["Synge med på alle sanger du hører"], ["Danse til alle sanger du hører"]],
    [
      ["Gi opp alt av sosiale medier resten av livet "],
      ["Spise samme middag resten av livet"],
    ],
    [["Leve 1000 tilbake i tid "], ["Leve 1000 år fram i tid "]],
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

  const handleBackToHomePage = () => {
    onLukk();
  };
  return (
    <>
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          padding: 5,
        }}
      >
        <Grid
          container
          sx={{ alignItems: "center", marginTop: "2%", marginBottom: "2%" }}
        >
          <Grid item xs={10}>
            <Typography
              variant="h2"
              style={{ marginBottom: "1%", marginLeft: "5%" }}
            >
              Dilemma
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ textAlign: "right", paddingRight: "2%" }}>
            <Button variant="contained" onClick={handleBackToHomePage}>
              Tilbake
            </Button>
          </Grid>
        </Grid>
        <div
          style={{
            flex: 1,
            backgroundColor: "#E3EAFD",
            display: "flex",
            flexDirection: "column",
            paddingTop: "2%",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <Typography variant="body1">
            Gå gjennom de 6 dilemmaene. Les dilemmaet høyt, tell til 3 og ta et
            valg!
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Card
                sx={{
                  maxWidth: 500,
                  margin: "auto",
                  marginTop: "4%",
                  height: 230,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ marginTop: "10px" }}>
                  <Typography variant="body1" align="center">
                    Stå opp hvis du helst ville:
                  </Typography>

                  <Typography variant="h6" align="center">
                    {dilemmaArray[dilemmaIndex][0]}
                  </Typography>
                  <Typography variant="body1" align="center">
                    Sitt på huk hvis du helst ville:
                  </Typography>
                  <Typography variant="h6" align="center">
                    {dilemmaArray[dilemmaIndex][1]}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between", marginTop: "auto" }}
                >
                  <Button
                    onClick={handleForrigeDilemma}
                    disabled={dilemmaIndex === 0}
                  >
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
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "70px",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    width: "150px",
                  }}
                  onClick={onFullfor}
                >
                  Øvelse ferdig
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Dilemma;
