import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { countStrings, sortMostVoted } from "../../constants";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import ImposterSyndromePicture from "../../images/Information.svg";

const PositivTenkingStatistikk = ({}) => {
  const { teamBruker, retroNummer } = useTeamContext();
  const [svarListe, setSvarListe] = useState<string[]>([]);

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv" + retroNummer);
      const svarRef = collection(retroRef, "positivTenking");

      const unsubscribe = onSnapshot(svarRef, (querySnapshot) => {
        const nyListe = querySnapshot.docs.flatMap((doc) =>
          Object.values(doc.data())
        );
        setSvarListe(nyListe);
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  //Telle stemmer
  const countedStrings = countStrings(svarListe);
  const sortedmostVoted = sortMostVoted(countedStrings);

  // Plukke ut de 5 mest stemte
  const topp3svar = sortedmostVoted.slice(0, 3);
  const reorderedTopp3svar = [];
  //reorderedTopp3svar.push(topp3svar[1]);
  //reorderedTopp3svar.push(topp3svar[0]);
  //reorderedTopp3svar.push(topp3svar[2]);

  return (
    <>
      {topp3svar && topp3svar.length > 0 && (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="flex-end"
          marginBottom={"2%"}
          marginTop={"2%"}
        >
          {topp3svar.map(([tekst, count], index) => (
            <Grid item key={index}>
              <Card
                style={{
                  backgroundColor: "white",
                  height: index === 1 ? "130px" : "100px",
                  width: index === 1 ? "300px" : "200px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <CardContent>
                  <Typography
                    width={"100%"}
                    textAlign={"center"}
                    variant="body1"
                    fontSize={index === 1 ? "20px" : "14px"}
                  >
                    {tekst}
                  </Typography>
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      backgroundColor: "#FF7C72",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    {count}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box
        sx={{
          border: "2px solid ",
          borderColor: "primary.main",
          width: "55%",
          maxWidth: "740px",
          minHeighteight: "160px",
          borderRadius: "6px",
          textAlign: "justify",
          padding: "30px",
          margin: "auto",
          position: "relative",
        }}
      >
        <img
          src={ImposterSyndromePicture}
          alt="Imposter Syndrome"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            maxWidth: "120px",
          }}
        />
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Imposter Syndrome og positiv tenking
        </Typography>

        <Typography variant="body2" marginBottom={0}>
          Når alle har svart vil kortet med flest stemmer vises over. Teamet
          oppmuntres til å støtte og annerkjenne de mest motiverende utsagene,
          og dermed styrke følelsen av positivitet og fellesskap. Positiv
          tenking er en teknikk som tar sikte på å utfordre negative tanker. Når
          man gjentar slike bekreftelser regelmessig, begynner hjernen å
          internalisere dem, og de blir gradvis en del av ens tro og
          selvoppfatning. Dette verktøyet kan hjelpe med å endre tankemønstre og
          bryte den negative tankespiralen som ofte oppstår ved Imposter
          Syndrome. Dette kan fremme bedre mental helse og trivsel.
        </Typography>
      </Box>
    </>
  );
};

export default PositivTenkingStatistikk;
