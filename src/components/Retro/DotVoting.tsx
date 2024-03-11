import { Typography, Grid, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import TavlePostIt from "./TavlePostIt";
import handleLeggTilObjekt from "../../firebase/handles/handleLeggTilObjekt";

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

  const { teamBruker, retroNummer } = useTeamContext();

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv" + retroNummer);

      const unsubscribe = onSnapshot(retroRef, (querySnapshot) => {
        const postIts = querySnapshot.data()?.bedrePostIts;
        setListe(postIts);
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
    handleLeggTilObjekt(retroNummer, valgtePostIts, "dotVotingStemmer");
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
        Individuell avstemning
      </Typography>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={3}>
          <Typography marginLeft={"5px"} variant="body1">
            Hva er viktigst for deg å forbedre framover?
          </Typography>
          <Typography marginLeft={"5px"} marginTop={"10px"} variant="body1">
            Klikk på de 3 lappene du vil at teamet skal fokusere på når dere
            setter nye mål.
          </Typography>
          <Box marginTop="50px" textAlign={"center"}>
            {sendtInn ? (
              <Typography>
                Pass på at alle har sendt inn før dere trykker "Neste"!!
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
          onClick={sendtInn ? undefined : handlePostItClick}
          selectedPostIts={valgtePostIts}
        />
      </Grid>
    </>
  );
};

export default DotVoting;
