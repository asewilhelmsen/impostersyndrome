import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
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
  const [sletteAlert, setSletteAlert] = useState(false);
  const [slettIndex, setSlettIndex] = useState<number | null>(null);

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

  //Kommer fra postit som blir trykket på og viser alert
  const handleDelete = (index: number) => {
    setSlettIndex(index);
    setSletteAlert(true);
  };

  const handleSletteAlert = () => {
    if (slettIndex !== null) {
      const updatedList = [...liste];
      updatedList.splice(slettIndex, 1);
      setListe(updatedList);
      handleFjernPostIt(retroNummer, updatedList);
    }
    setSletteAlert(false);
  };
  const handleCancelDelete = () => {
    setSletteAlert(false);
  };

  //vet ikke helt hva denne gjør nå
  useEffect(() => {
    onOppdatertListe(liste);
  }, [liste]);

  return (
    <>
      {sletteAlert && (
        <Dialog
          open={sletteAlert}
          onClose={handleCancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Slett lapp"}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Er du sikker på at du vil slette lappen?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Avbryt</Button>
            <Button onClick={handleSletteAlert} autoFocus>
              Slett
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Typography variant="h2" sx={{ marginBottom: "30px" }}>
        {overskrift}
      </Typography>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={3}>
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
