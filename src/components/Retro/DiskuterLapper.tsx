import { Typography, Grid, Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";

import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

import TavlePostIt from "./TavlePostIt";
import handleFjernPostIt from "../../firebase/handles/handleFjernPostIt";

const DiskuterLapper = ({
  overskrift,
  forklaring,
  filtrer,
  onDiskuterFerdig,
  onOppdatertListe,
}: {
  overskrift: string;
  forklaring: any;
  filtrer: boolean;
  onDiskuterFerdig: (disabled: boolean) => void;
  onOppdatertListe: (liste: string[]) => void;
}) => {
  const [liste, setListe] = useState<string[]>([]);
  const [lapperErFjernet, setLapperErFjernet] = useState<boolean>(false);

  //Brukeren som er logget inn på og antall team medlemmer
  const { teamBruker, retroNummer } = useTeamContext();

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv" + retroNummer);
      if (filtrer) {
        const unsubscribe = onSnapshot(retroRef, (querySnapshot) => {
          const data = querySnapshot.data();
          if (data && data.bedrePostIts) {
            setListe(data.bedrePostIts);
          }
        });
        return unsubscribe;
      } else {
        const unsubscribe = onSnapshot(retroRef, (querySnapshot) => {
          const data = querySnapshot.data();
          if (data && data.braPostIts) {
            setListe(data.braPostIts);
          }
        });
        return unsubscribe;
      }
    }
  }, [teamBruker]);

  const handleDelete = (index: number) => {
    const updatedList = [...liste];
    updatedList.splice(index, 1);
    setListe(updatedList);
    handleFjernPostIt(retroNummer, updatedList);
  };

  useEffect(() => {
    onOppdatertListe(liste);
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
          <TavlePostIt
            key={JSON.stringify(liste)}
            liste={liste}
            onDelete={handleDelete}
          />
        ) : (
          <TavlePostIt liste={liste} />
        )}
      </Grid>
    </>
  );
};

export default DiskuterLapper;
