import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Typography,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import { useTeamContext } from "../../TeamContext";
import { Maalene } from "../../interfaces";
import { collection, doc, onSnapshot } from "@firebase/firestore";
import styles from "../StartAktivitet/Forventninger.module.css";
import { firestore } from "../../firebase/firebase_setup/firebase";
import handleAddMaal from "../../firebase/handles/handleAddMaal";
import ExpectationImg from "../../images/Expectations.svg";

const StatusMaal = ({ onLagre }: { onLagre: (disabled: boolean) => void }) => {
  const { teamBruker, retroNummer } = useTeamContext();
  const [maalene, setMaalene] = useState<Maalene[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    onLagre(true);
    if (teamBruker) {
      const teamRef = collection(firestore, teamBruker.uid);
      const forventningerRef = doc(teamRef, "forventninger");
      const maalRef = collection(forventningerRef, "maal");

      const refString = "retroMaal" + (retroNummer - 1).toString();

      let tidligereMaalRef = doc(maalRef, refString);
      if (retroNummer === 1) {
        tidligereMaalRef = doc(maalRef, "startAktMaal");
      }

      const tidligereMaalUnsubscribe = onSnapshot(
        tidligereMaalRef,
        (querySnapshot) => {
          const data = querySnapshot.data();
          const maalene: Maalene[] = [];
          if (data) {
            for (let i = 1; i <= Object.keys(data).length; i++) {
              const key = i.toString();
              maalene.push({ id: key, tekst: data[key] });
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

  const handleClick = () => {
    const uncheckedMaalene = maalene.filter((maal) => !checkedItems[maal.id]);
    handleAddMaal(uncheckedMaalene, "retro", "retroMaal" + retroNummer);
    onLagre(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2">Status av målsetting</Typography>
        <Typography marginLeft={"5px"} variant="body1" width={"40%"}>
          Diskuter og bli enige om målene dere har fokusert på og klart å
          gjennomføre frem til nå. Velg én person som huker av målene dere har
          fått til.
        </Typography>
      </Grid>
      <Grid item xs={8} sx={{ paddingLeft: "10%" }}>
        <Typography
          variant="h5"
          sx={{
            textDecoration: "underline",
            marginBottom: 0,
            marginLeft: "28px",
          }}
        >
          Teamet's mål
        </Typography>
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
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ marginLeft: "28px" }}
        >
          Lagre
        </Button>
      </Grid>
      <Grid item xs={4}>
        <img
          src={ExpectationImg}
          className={styles.expectationImg}
          alt="Expectation illustration"
          style={{ width: "250px", margin: "auto" }}
        ></img>
      </Grid>
    </Grid>
  );
};

export default StatusMaal;
