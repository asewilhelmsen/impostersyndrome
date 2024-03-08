import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Maalene } from "../../interfaces";
import { useTeamContext } from "../../TeamContext";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import MaalRetro from "../MaalRetro";
import {
  countStrings,
  hentOppdatertPostItListe,
  sortMostVoted,
} from "../../constants";
import handleAddMaal from "../../firebase/handles/handleAddMaal";

const NyeMaal = ({
  onMaalFerdig,
}: {
  onMaalFerdig: (disabled: boolean) => void;
}) => {
  const [lagredeMaalene, setLagredeMaalene] = useState<Maalene[]>([]);
  const [dotVotingPostIts, setDotVotingPostIts] = useState<string[]>([]);

  const { teamBruker, retroNummer } = useTeamContext();
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  const onMaalSubmit = (maalene: Maalene[]) => {
    setLagredeMaalene(maalene);
  };

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const forventningerRef = doc(teamRef, "forventninger");
      const maalRef = collection(forventningerRef, "maal");
      const retroMaalRef = doc(maalRef, "retroMaal" + retroNummer);

      const retroRef = doc(teamRef, "retrospektiv" + retroNummer);
      const stemmerRef = collection(retroRef, "dotVotingStemmer");

      const tidligereMaalUnsubscribe = onSnapshot(
        retroMaalRef,
        (querySnapshot) => {
          const data = querySnapshot.data();
          const maalene: Maalene[] = [];
          if (data) {
            for (let i = 1; i <= Object.keys(data).length; i++) {
              const key = i.toString();
              maalene.push({
                id: key,
                tekst: data[key].tekst,
                checked: data[key].checked,
              });
            }
          }
          setLagredeMaalene(maalene);
        }
      );

      const dotVotingUnsubscribe = onSnapshot(stemmerRef, (querySnapshot) => {
        const nyListe = querySnapshot.docs.flatMap((doc) =>
          Object.values(doc.data())
        );
        setDotVotingPostIts(nyListe);
      });

      return () => {
        tidligereMaalUnsubscribe();
        dotVotingUnsubscribe();
      };
    }
  }, [teamBruker]);

  useEffect(() => {
    //Oppdatere til når vi vil at man skal kunne klikke ferdig, evt min antall mål
    // onMaalFerdig(lagredeMaalene.length <2 );
    handleAddMaal(lagredeMaalene, "retro", "retroMaal" + (retroNummer + 1));
  }, [lagredeMaalene]);

  //Telle stemmer
  const tellerAntallStemmer = countStrings(dotVotingPostIts);
  const sorterBasertPaStemmer = sortMostVoted(tellerAntallStemmer);
  const postItsMedFlestStemmer = hentOppdatertPostItListe(
    sorterBasertPaStemmer
  );

  return (
    <>
      <Typography variant="h2">Nye mål</Typography>
      <Typography variant="body1">
        Basert på lappene med flest stemmer, sett nye mål for neste sprint.
      </Typography>
      <Grid container spacing={2} direction={isSmallScreen ? "column" : "row"}>
        <Grid item xs={4}>
          <Card
            sx={{
              minHeight: 500,
              height: "100%",
              display: "flex",
              backgroundColor: "#CDDBF7",
              color: "white",
              padding: "10px",
            }}
          >
            <CardContent sx={{ marginTop: "15px" }}>
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                Lappene med flest stemmer
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {postItsMedFlestStemmer.map(([tekst, count], index) => (
                  <Grid item key={index}>
                    <Card
                      style={{
                        backgroundColor: "#ffff99",
                        height: "100px",
                        width: "150px",
                        position: "relative",
                        margin: "10px",
                      }}
                    >
                      <CardContent>
                        <Typography
                          width={"100%"}
                          textAlign={"center"}
                          variant="body1"
                        >
                          {tekst}
                        </Typography>
                        <div
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            backgroundColor: "#ff1493",
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={{
              minHeight: 500,
              height: "100%",
              display: "flex",
              backgroundColor: "#CDDBF7",
              color: "white",
              padding: "10px",
            }}
          >
            <CardContent sx={{ marginTop: "15px" }}>
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                Sett nye mål
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {"Velg ett teammedlem som fyller inn målene!"}
              </Typography>
              {lagredeMaalene && (
                <MaalRetro
                  onMaalSubmit={onMaalSubmit}
                  tidligereMaal={lagredeMaalene}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card
            sx={{
              minHeight: 500,
              height: "100%",
              backgroundColor: "#CDDBF7",
              color: "white",
              padding: "10px",
            }}
          >
            <CardContent sx={{ marginTop: "15px" }}>
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                Teamet's mål
              </Typography>
              <List sx={{ textAlign: "center" }}>
                {lagredeMaalene.map((maal, maalIndex) => (
                  <ListItem key={maalIndex} sx={{ paddingLeft: "0" }}>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>{`Mål ${
                        maalIndex + 1
                      }: `}</span>
                      {maal.tekst}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default NyeMaal;
