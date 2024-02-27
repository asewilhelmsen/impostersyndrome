import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import A from "../../images/A.svg";
import B from "../../images/B.svg";
import Maal from "../Maal";
import React, { useEffect, useState } from "react";
import { Maalene } from "../../interfaces";
import { useTeamContext } from "../../TeamContext";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

const NyeMaal = ({
  onMaalSubmit,
  onMaalFerdig,
}: {
  onMaalSubmit: (maal: Maalene[]) => void;
  onMaalFerdig: (disabled: boolean) => void;
}) => {
  const [lagredeMaalene, setLagredeMaalene] = useState<Maalene[]>([]);
  const [dotVotingPostIts, setDotVotingPostIts] = useState<string[]>([]);

  const { teamBruker, retroNummer } = useTeamContext();
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const forventningerRef = doc(teamRef, "forventninger");
      const maalRef = collection(forventningerRef, "maal");
      const startAktRef = doc(maalRef, "retroMaal");

      const retroRef = doc(teamRef, "retrospektiv" + retroNummer);
      const svarRef = collection(retroRef, "dotVotingPostIts");

      const tidligereMaalUnsubscribe = onSnapshot(
        startAktRef,
        (querySnapshot) => {
          const data = querySnapshot.data();
          const maalene: Maalene[] = [];
          if (data) {
            for (let i = 1; i <= Object.keys(data).length; i++) {
              const key = i.toString();
              maalene.push({ id: key, tekst: data[key] });
            }
          }
          setLagredeMaalene(maalene);
        }
      );

      const dotVotingUnsubscribe = onSnapshot(svarRef, (querySnapshot) => {
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
  }, [lagredeMaalene]);

  // For å telle hvilke lapper som er mest stemt på under dotvoting
  const postItCount: { [tekst: string]: number } = {};
  dotVotingPostIts.forEach((tekst) => {
    postItCount[tekst] = (postItCount[tekst] || 0) + 1;
  });

  // Sortere i synkende rekkefølge
  const sortedWordCounts = Object.entries(postItCount).sort(
    (a, b) => b[1] - a[1]
  );

  // Plukke ut de 5 mest stemte
  const topp5postIts = sortedWordCounts.slice(0, 5);

  return (
    <>
      <Typography variant="h2">Ny målsetting</Typography>
      <Typography variant="body1">
        Se på de målene dere tar med fra forrige sprint og lag noen ny mål
        basert på de postItene som fikk flest stemmer
      </Typography>

      <Grid container spacing={2} direction={isSmallScreen ? "column" : "row"}>
        <Grid item xs={4}>
          <Card
            sx={{
              minHeight: 500,
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
              <Maal onMaalSubmit={onMaalSubmit} aktivitet="retro" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card
            sx={{
              minHeight: 500,
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
        <Grid item xs={4}>
          <Card
            sx={{
              minHeight: 500,
              display: "flex",
              backgroundColor: "#CDDBF7",
              color: "white",
              padding: "10px",
            }}
          >
            <CardContent sx={{ marginTop: "15px" }}>
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                De mest stemte postItsene
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {topp5postIts.map(([tekst, count], index) => (
                  <Grid item key={index}>
                    <Card
                      style={{
                        backgroundColor: "#ffff99",
                        height: "100px",
                        width: "200px",
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
                            top: "5px",
                            right: "5px",
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
      </Grid>
    </>
  );
};

export default NyeMaal;
