import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import A from "../../images/A.svg";
import B from "../../images/B.svg";
import Maal from "../Maal";
import ExpectationImg from "../../images/Expectations.svg";
import React, { useEffect, useState } from "react";
import styles from "./Forventninger.module.css";
import { Maalene } from "../../interfaces";
import { useTeamContext } from "../../TeamContext";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

const expectationsList = [
  {
    id: "A",
    text: "Del forventningene dere har til de andre team-medlemmene på dette prosjektet",
    imgSrc: A,
  },
  {
    id: "B",
    text: "Definer og skriv konkrete mål angående samarbeid for dette prosjektet",
    imgSrc: B,
  },
];

const Forventninger = ({
  onMaalSubmit,
}: {
  onMaalSubmit: (maal: Maalene[]) => void;
}) => {
  const [lagredeMaalene, setLagredeMaalene] = useState<Maalene[]>([]);
  const { teamBruker } = useTeamContext();
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const forventningerRef = doc(teamRef, "forventninger");
      const maalRef = collection(forventningerRef, "maal");
      const startAktRef = doc(maalRef, "startAktMaal");

      const unsubscribe = onSnapshot(startAktRef, (querySnapshot) => {
        const data = querySnapshot.data();
        const maalene: Maalene[] = [];
        if (data) {
          for (const [id, tekst] of Object.entries(data)) {
            maalene.push({ id, tekst });
          }
        }
        setLagredeMaalene(maalene);
      });

      return unsubscribe;
    }
  }, [teamBruker]);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2%",
          }}
        >
          <Typography variant="h2">Forventningsavklaring</Typography>
        </Grid>
        {expectationsList.map(({ id, text, imgSrc }) => (
          <React.Fragment key={id}>
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2%",
              }}
            >
              <img
                src={imgSrc}
                alt={`${id} bullet point`}
                style={{ width: "60%" }}
              />
            </Grid>
            <Grid
              item
              xs={11}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "2%",
              }}
            >
              <Typography>{text}</Typography>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={1}></Grid>
        <Grid item xs={8}>
          <Typography
            sx={{
              color: "text.secondary",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {"Velg ett teammedlem som fyller inn målene!"}
          </Typography>
          <Maal onMaalSubmit={onMaalSubmit} />
        </Grid>
      </Grid>

      {lagredeMaalene.length > 0 ? (
        <Box
          sx={{
            maxWidth: isSmallScreen ? "80%" : "40%",
            flexBasis: "50%",
            marginLeft: "10%",
            marginTop: isSmallScreen ? "10px" : "10%",
          }}
        >
          <Typography sx={{ textDecoration: "underline" }}>
            Teamet's mål
          </Typography>
          <List sx={{ listStyleType: "disc" }}>
            {lagredeMaalene.map((maal, maalIndex) => (
              <ListItem
                key={maalIndex}
                alignItems="flex-start"
                sx={{ display: "list-item" }}
              >
                <Typography>{`${maal.tekst}`}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <img
          src={ExpectationImg}
          alt="Expectation illustration"
          className={styles.expectationImg}
          style={{ width: "20%", paddingRight: "15%" }}
        ></img>
      )}
    </Box>
  );
};

export default Forventninger;
