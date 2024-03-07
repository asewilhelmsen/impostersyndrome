import {
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import wave from "../../wave.svg";
import { useEffect, useState } from "react";
import getMaal from "../../firebase/getMaal";
import { Maalene } from "../../interfaces";
import getRetro from "../../firebase/getRetro";
import TavlePostIt from "./TavlePostIt";

const RetroOppsummering = ({
  retroNummer,
  onOppsummeringLukk,
}: {
  retroNummer: number;
  onOppsummeringLukk: (lukket: boolean) => void;
}) => {
  const [maal, setMaal] = useState<Maalene[]>([]);
  const [gikkBra, settGikkBra] = useState();
  const [bedre, settBedre] = useState();

  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  const handleBackToHomePage = () => {
    onOppsummeringLukk(false);
  };

  const setData = async () => {
    try {
      const maal = await getMaal("retroMaal" + retroNummer);
      if (maal) {
        const maalene: Maalene[] = [];
        for (let i = 1; i <= Object.keys(maal).length; i++) {
          const key = i.toString();
          maalene.push({ id: key, tekst: maal[key] });
        }
        setMaal(maalene);
      }
      const retro = await getRetro(retroNummer);
      settGikkBra(retro?.braPostIts);
      settBedre(retro?.bedrePostIts);
    } catch (error) {
      console.error("Kan ikke hente oppsummering av retro", error);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container marginTop={"1%"}>
          <Grid item xs={10}>
            <Typography
              variant="h2"
              style={{ marginBottom: "1%", marginLeft: "5%" }}
            >
              Retrospektiv {retroNummer}
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
            backgroundImage: `url(${wave})`,
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            paddingTop: isSmallScreen ? "10%" : "6%",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                Teamet's mål
              </Typography>
              <List sx={{ textAlign: "center" }}>
                {maal.map((maal, maalIndex) => (
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
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                Dette gikk bra
              </Typography>
              {gikkBra && <TavlePostIt liste={gikkBra} />}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                Dette kunne gått bedre
              </Typography>
              {bedre && <TavlePostIt liste={bedre} />}
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default RetroOppsummering;
