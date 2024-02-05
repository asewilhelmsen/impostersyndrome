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
    text: "Bruk 3 minutter til å reflektere individuelt over hva som er viktig for at du trives i et team",
    imgSrc: A,
  },
  {
    id: "B",
    text: "Del tankene og definer konkrete mål for å oppnå et godt teamsamarbeid",
    imgSrc: B,
  },
];

const Forventninger = ({
  onMaalSubmit,
  onForventningerFerdig,
}: {
  onMaalSubmit: (maal: Maalene[]) => void;
  onForventningerFerdig: (disabled: boolean) => void;
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
          for (let i = 1; i <= Object.keys(data).length; i++) {
            const key = i.toString();
            maalene.push({ id: key, tekst: data[key] });
          }
        }
        setLagredeMaalene(maalene);
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  useEffect(() => {
    onForventningerFerdig(lagredeMaalene.length < 2);
  }, [lagredeMaalene]);

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
          <Typography variant="h2">Felles målsetting</Typography>
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
          <Maal
            onMaalSubmit={onMaalSubmit}
            onForventningerFerdig={onForventningerFerdig}
          />
        </Grid>
      </Grid>

      {lagredeMaalene.length > 0 ? (
        <Box
          sx={{
            maxWidth: isSmallScreen ? "60%" : "40%",
            flexBasis: "50%",
            marginLeft: isSmallScreen ? "8%" : "0",
            marginRight: isSmallScreen ? "8%" : "5%",
            marginTop: isSmallScreen ? "10px" : "10%",
          }}
        >
          <Card
            sx={{
              minHeight: 200,
              margin: "auto",
              height: "auto",
              display: "flex",
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
