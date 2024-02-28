import { List, ListItem, Typography } from "@mui/material";
import { useTeamContext } from "../../TeamContext";
import getMaal from "../../firebase/getMaal";
import { Maalene } from "../../interfaces";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

const StatusMaal = () => {
  const { teamBruker } = useTeamContext();
  const [maalene, setMaalene] = useState<Maalene[]>([]);

  const setMaal = async () => {
    try {
      const maalDB = await getMaal();
      if (maalDB) {
        const maal: Maalene[] = [];
        for (let i = 1; i <= Object.keys(maalDB).length; i++) {
          const key = i.toString();
          maal.push({ id: key, tekst: maalDB[key] });
        }
        setMaalene(maalene);
      }
    } catch (error) {
      console.error("Kan ikke hente målene", error);
    }
  };

  useEffect(() => {
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const forventningerRef = doc(teamRef, "forventninger");
      const maalRef = collection(forventningerRef, "maal");
      const startAktRef = doc(maalRef, "startAktMaal");

      const tidligereMaalUnsubscribe = onSnapshot(
        startAktRef,
        (querySnapshot) => {
          const data = querySnapshot.data();
          const maalene: Maalene[] = [];
          if (data) {
            for (let i = 1; i <= Object.keys(data).length; i++) {
              const key = i.toString();
              maalene.push({ id: key, tekst: data[key] });
            }
          }
          setMaalene(maalene);
        }
      );

      return () => {
        tidligereMaalUnsubscribe();
      };
    }
  }, [teamBruker]);

  /*useEffect(() => {
    setMaal();
  }, []);*/

  return (
    <>
      <Typography variant="h2">Status av målsetting</Typography>
      <List sx={{ textAlign: "center" }}>
        {maalene.map((maal, maalIndex) => (
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
    </>
  );
};

export default StatusMaal;
