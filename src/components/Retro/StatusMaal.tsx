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
import ExpectationImg from "../../images/Expectations.svg";
import handleOppdaterMaalChecked from "../../firebase/handles/handleOppdaterMaalChecked";
import handleAddMaal from "../../firebase/handles/handleAddMaal";
import Confetti from "react-confetti";

const StatusMaal = ({
  onLagre,
  leggTilMaal,
}: {
  onLagre: (disabled: boolean) => void;
  leggTilMaal: (maalListe: Maalene[]) => void;
}) => {
  const { teamBruker, retroNummer } = useTeamContext();
  const [maalene, setMaalene] = useState<Maalene[]>([]);
  // const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>( {} );
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const uncheckedMaalene = maalene.filter((maal) => !maal.checked);
    leggTilMaal(uncheckedMaalene);
  }, [maalene]);

  useEffect(() => {
    onLagre(false);
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
              maalene.push({
                id: key,
                tekst: data[key].tekst,
                checked: data[key].checked,
              });
              // setCheckedItems((prev) => ({ ...prev, [key]: false }));
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

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setMaalene((prevMaalene) =>
      prevMaalene.map((maal) =>
        maal.id === id ? { ...maal, checked: !maal.checked } : maal
      )
    );
    handleOppdaterMaalChecked(
      "retro",
      retroNummer === 1 ? "startAktMaal" : `retroMaal${retroNummer}`,
      id,
      !checked
    );

    if (checked === false) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); //
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2">Tidligere mål</Typography>
        <Typography marginLeft={"5px"} variant="body1" width={"40%"}>
          Diskuter og bli enige om hvilke mål dere har fått til fram til nå.
          Velg én person som huker av disse målene. Målene som ikke blir huket
          av vil bli videreført til neste sprint.
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
                checked={maal.checked}
                onChange={() => handleCheckboxChange(maal.id, maal.checked)}
              />
              <Typography sx={{ margin: "auto", marginLeft: 0 }}>
                {maal.tekst}
              </Typography>
            </ListItem>
          ))}
        </List>
        {showConfetti && <Confetti />}
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
