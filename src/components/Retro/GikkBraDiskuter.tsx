import { Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";

import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

import TavlePostIt from "./TavlePostIt";

const GikkBraDiskuter = ({
  onBraSkrivFerdig,
}: {
  onBraSkrivFerdig: (disabled: boolean) => void;
}) => {
  const [braListe, setBraListe] = useState<string[]>([]);

  //Brukeren som er logget inn på og antall team medlemmer
  const { teamBruker } = useTeamContext();

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv");
      const svarRef = collection(retroRef, "braLapper");

      const unsubscribe = onSnapshot(svarRef, (querySnapshot) => {
        const nyBraListe = querySnapshot.docs.flatMap((doc) =>
          Object.values(doc.data())
        );
        setBraListe(nyBraListe);
      });
      return unsubscribe;
    }
  }, [teamBruker]);

  return (
    <>
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        Hva gikk bra? - Diskuter
      </Typography>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={4}>
          <Typography marginLeft={"5px"} variant="body1">
            Gå gjennom lappene og diskuter!
          </Typography>
        </Grid>
        <TavlePostIt liste={braListe} />
      </Grid>
    </>
  );
};

export default GikkBraDiskuter;
