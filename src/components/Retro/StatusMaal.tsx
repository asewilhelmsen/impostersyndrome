import { useState, useEffect } from "react";
import { List, ListItem, Typography, Checkbox, Button } from "@mui/material";
import { useTeamContext } from "../../TeamContext";
import { Maalene } from "../../interfaces";
import { collection, doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

const StatusMaal = () => {
  const { teamBruker } = useTeamContext();
  const [maalene, setMaalene] = useState<Maalene[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

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
              // Initialize checkedItems state
              setCheckedItems((prev) => ({ ...prev, [key]: false }));
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

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Typography variant="h2">Status av målsetting</Typography>
      <List>
        {maalene.map((maal, maalIndex) => (
          <ListItem key={maalIndex}>
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 28,
                  color: "text.primary",
                },
              }}
              checked={checkedItems[maal.id]}
              onChange={() => handleCheckboxChange(maal.id)}
            />
            <Typography sx={{ margin: "auto", marginLeft: 0 }}>
              {maal.tekst}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Button variant="contained">Lagre</Button>
    </>
  );
};

export default StatusMaal;
