import { Box, Grid, Typography } from "@mui/material";
import A from "../../images/A.svg";
import B from "../../images/B.svg";
import C from "../../images/C.svg";
import Maal from "../Maal";
import ExpectationImg from "../../images/Expectations.svg";
import React from "react";
import styles from "./Forventninger.module.css";

const expectationsList = [
  {
    id: "A",
    text: "Ta en runde og del hver enkelts styrker og svakheter i et teamprosjekt",
    imgSrc: A,
  },
  {
    id: "B",
    text: "Del forventningene dere har til de andre team-medlemmene på dette prosjektet",
    imgSrc: B,
  },
  {
    id: "C",
    text: "Definer og skriv konkrete mål angående samarbeid for dette prosjektet",
    imgSrc: C,
  },
];

const Forventninger = () => {
  return (
    <Box style={{ display: "flex", flexDirection: "row" }}>
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
          <Typography variant="h2" style={{ marginBottom: 0 }}>
            Forventningsavklaring
          </Typography>
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
              style={{ display: "flex", alignItems: "center", marginTop: "2%" }}
            >
              <Typography>{text}</Typography>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={1}></Grid>
        <Grid item xs={8}>
          <Maal />
        </Grid>
      </Grid>

      <img
        src={ExpectationImg}
        alt="Expectation illustration"
        className={styles.expectationImg}
        style={{ width: "20%", paddingRight: "15%" }}
      ></img>
    </Box>
  );
};

export default Forventninger;
