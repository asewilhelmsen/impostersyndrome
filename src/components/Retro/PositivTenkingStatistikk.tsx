import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, Tooltip } from "@mui/material";
import { countStrings, sortMostVoted } from "../../constants";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

const PositivTenkingStatistikk = ({}) => {
  const { teamBruker, retroNummer } = useTeamContext();
  const [svarListe, setSvarListe] = useState<string[]>([]);

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const retroRef = doc(teamRef, "retrospektiv" + retroNummer);
      const svarRef = collection(retroRef, "positivTenking");

      const unsubscribe = onSnapshot(svarRef, (querySnapshot) => {
        const nyListe = querySnapshot.docs.flatMap((doc) =>
          Object.values(doc.data())
        );
        setSvarListe(nyListe);
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  //Telle stemmer
  //const countedStrings = countStrings(dotVotingPostIts);
  //const sortedmostVoted = sortMostVoted(countedStrings);

  // Plukke ut de 5 mest stemte
  //const topp5postIts = sortedmostVoted.slice(0, 5);

  return <div>hei</div>;
};

export default PositivTenkingStatistikk;
