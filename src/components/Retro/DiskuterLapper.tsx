import { Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";

import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

import TavlePostIt from "./TavlePostIt";

const DiskuterLapper = ({
  overskrift,
  forklaring,
  filtrer,
  onDiskuterFerdig,
  onOppdatertListe,
}: {
  overskrift: string;
  forklaring: string;
  filtrer: boolean;
  onDiskuterFerdig: (disabled: boolean) => void;
  onOppdatertListe: (liste: string[]) => void;
}) => {
  const [liste, setListe] = useState<string[]>([]);

  //Brukeren som er logget inn på og antall team medlemmer
  const { teamBruker } = useTeamContext();

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv");
      let svarRef = collection(retroRef, "braPostIts");

      //Er på "Hva kunne gått bedre" steg - gjort så man kan bruke komponentet på begge stegene
      if (filtrer) {
        svarRef = collection(retroRef, "bedrePostIts");
      }

      const unsubscribe = onSnapshot(svarRef, (querySnapshot) => {
        const nyBraListe = querySnapshot.docs.flatMap((doc) =>
          Object.values(doc.data())
        );
        setListe(nyBraListe);
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  const handleDelete = (index: number) => {
    const updatedList = [...liste];
    updatedList.splice(index, 1);
    setListe(updatedList);
  };

  useEffect(() => {
    onOppdatertListe(liste);
    //for å ta bort at knappen er disabled
    onDiskuterFerdig(false);
  }, [liste]);
  return (
    <>
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        {overskrift}
      </Typography>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={4}>
          <Typography marginLeft={"5px"} variant="body1">
            {forklaring}
          </Typography>
        </Grid>
        {filtrer ? (
          <TavlePostIt liste={liste} onDelete={handleDelete} />
        ) : (
          <TavlePostIt liste={liste} />
        )}
      </Grid>
    </>
  );
};

export default DiskuterLapper;
