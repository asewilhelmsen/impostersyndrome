import { Typography, Grid, Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";

import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

import TavlePostIt from "./TavlePostIt";
import handleLeggTilRetroSvar from "../../firebase/handles/handleLeggTilRetroSvar";

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
  const handleLapperFjernet = () => {
    onDiskuterFerdig(false);
    handleLeggTilRetroSvar(liste, "filtrertBedrePostIts");
    setLapperErFjernet(true);
  };

  useEffect(() => {
    onOppdatertListe(liste);
    //for å ta bort at knappen er disabled når man ikke er på filtrer steget
    onDiskuterFerdig(filtrer);
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
          {filtrer && (
            <Grid
              item
              sx={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {lapperErFjernet ? (
                <Typography>Gå videre til neste steg</Typography>
              ) : (
                <Tooltip
                  title={
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Klikk på denne hvis det er du som har fjernet lapper på
                      vegne av gruppen
                    </Typography>
                  }
                >
                  <Button variant="contained" onClick={handleLapperFjernet}>
                    Lapper fjernet
                  </Button>
                </Tooltip>
              )}
            </Grid>
          )}
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
