import { Typography, Grid, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";

import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

import TavlePostIt from "./TavlePostIt";
import handleLeggTilRetroSvar from "../../firebase/handles/handleLeggTilRetroSvar";

const DotVoting = ({
  onOppdatertListe,
  onVotingFerdig,
}: {
  onOppdatertListe: (liste: string[]) => void;
  onVotingFerdig: (disabled: boolean) => void;
}) => {
  const [liste, setListe] = useState<string[]>([]);
  const [valgtePostIts, setValgtePostIts] = useState<string[]>([]);

  const [sendtInn, setSendtInn] = useState(false);

  const { teamBruker } = useTeamContext();

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv");
      const svarRef = collection(retroRef, "filtrertBedrePostIts");

      const unsubscribe = onSnapshot(svarRef, (querySnapshot) => {
        const nyListe = querySnapshot.docs.flatMap((doc) =>
          Object.values(doc.data())
        );
        setListe(nyListe);
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  //Se hvilke brukeren stemmer på
  const handlePostItClick = (tekst: string) => {
    // Hvis den allerede er valgt og klikker igjen fjernes valget
    if (valgtePostIts.includes(tekst)) {
      setValgtePostIts(valgtePostIts.filter((item) => item !== tekst));
    } else {
      // Sjekker at man bare kan velge 3
      if (valgtePostIts.length < 3) {
        setValgtePostIts([...valgtePostIts, tekst]);
      } else {
        // Kan evt gi noe feedback her på at man ikke kan velge flere
      }
    }
  };

  const handleSendInn = () => {
    handleLeggTilRetroSvar(valgtePostIts, "dotVotingPostIts");
    setSendtInn(true);
    onVotingFerdig(false);
  };

  useEffect(() => {
    onOppdatertListe(valgtePostIts);
    onVotingFerdig(true);
  }, [valgtePostIts]);

  return (
    <>
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        Dot voting
      </Typography>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={4}>
          <Typography marginLeft={"5px"} variant="body1">
            Hva synes du er viktigst at dere skal fokusere på sammen som et team
            framover?
          </Typography>
          <Typography marginLeft={"5px"} variant="body1">
            Klikk på de 3 lappene du vil fokusere på.
          </Typography>
          <Box marginTop="50px">
            {sendtInn ? (
              <Typography>
                Pass på at alle har sendt inn før dere trykker neste
              </Typography>
            ) : (
              <Button variant="contained" onClick={handleSendInn}>
                Send inn
              </Button>
            )}
          </Box>
        </Grid>
        <TavlePostIt
          liste={liste}
          onClick={handlePostItClick}
          selectedPostIts={valgtePostIts}
        />
      </Grid>
    </>
  );
};

export default DotVoting;
