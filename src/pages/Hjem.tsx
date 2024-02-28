import { Button, Grid, Tooltip, Typography } from "@mui/material";
import wave from "../wave.svg";
import Popup from "../components/Popup";
import teamConnectors from "../images/teamConnectors.svg";
import teamConnectors_done from "../images/teamConnectors_done.svg";
import communicationExplorers from "../images/communicationExplorers.svg";
import communicationExplorers_done from "../images/communicationExplorers_done.svg";
import bondBuilders from "../images/bondBuilders.svg";
import bondBuilders_done from "../images/bondBuilders_done.svg";
import dreamTeam from "../images/dreamTeam.svg";
import dreamTeam_done from "../images/dreamTeam_done.svg";
import RetroButton from "../components/RetroButton";
import StartAktivitetButton from "../components/StartAktivitetButton";
import TeambuildingButton from "../components/TeambuildingButton";
import { useState, useEffect } from "react";
import { useTeamContext } from "../TeamContext";
import { firestore } from "../firebase/firebase_setup/firebase";
import { doc, onSnapshot } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import LevelPopUp from "../components/LevelPopUp";
import handleCloseLevelPopUp from "../firebase/handles/handleCloseLevelPopUp";
import getTeamInfo from "../firebase/getTeamInfo";
import { useMediaQuery } from "@mui/material";
import getPopupInnhold from "../firebase/getPopupInnhold";
import getMaal from "../firebase/getMaal";
import MaalPopUp from "../components/MaalPopUp";
import { Maalene } from "../interfaces";
import handleFinishStartAkt from "../firebase/handles/handleFinishStartAkt";
import handleNextStep from "../firebase/handles/handleNextStep";

const Hjem = ({ handleSignOut }: { handleSignOut: () => Promise<void> }) => {
  const [teamLevel, setTeamLevel] = useState(0);
  const [teamNavn, setTeamNavn] = useState("Bachelorgruppe");
  const [startAktMaal, setStartAktMaal] = useState<Maalene[]>([]);
  const [popupOverskrift, setPopupOverskrift] = useState("Velkommen!");
  const [popupTekst, setPopupTekst] = useState(
    "Samle teamet ditt og kom i gang med Start-aktiviteten"
  );

  const [showPopUpLevel1, setShowPopUpLevel1] = useState(false);
  const [showPopUpLevel2, setShowPopUpLevel2] = useState(false);

  const [showMaalPopUp, setShowMaalPopUp] = useState(false);

  const { teamBruker, retroNummer, setTeamAntall, setRetroNummer } =
    useTeamContext();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  const setTeamInfo = async () => {
    try {
      const teamInfo = await getTeamInfo();
      if (teamInfo) {
        setTeamLevel(teamInfo.level);
        setTeamNavn(teamInfo.teamNavn);
        setTeamAntall(teamInfo.antallMedlemmer);
        setRetroNummer(teamInfo.retroNummer);
      }
    } catch (error) {
      console.error("Kan ikke hente level", error);
    }
  };

  const setPopupInnhold = async (popupInnholdId: string) => {
    try {
      const popupInnhold = await getPopupInnhold(popupInnholdId);
      if (popupInnhold) {
        setPopupOverskrift(popupInnhold.overskrift);
        setPopupTekst(popupInnhold.tekst);
      }
    } catch (error) {
      console.error("Kan ikke hente popup innhold", error);
    }
  };

  const setMaal = async () => {
    try {
      const maal = await getMaal();
      if (maal) {
        const maalene: Maalene[] = [];
        for (let i = 1; i <= Object.keys(maal).length; i++) {
          const key = i.toString();
          maalene.push({ id: key, tekst: maal[key] });
        }
        setStartAktMaal(maalene);
      }
    } catch (error) {
      console.error("Kan ikke hente målene", error);
    }
  };

  useEffect(() => {
    setTeamInfo();
    setPopupInnhold("velkommen");
    setMaal();
  }, []);

  useEffect(() => {
    if (teamBruker) {
      const startAktivitetDocRef = doc(
        firestore,
        teamBruker.uid,
        "startAktivitetSteg"
      );
      const startAktivitetUnsubscribe = onSnapshot(
        startAktivitetDocRef,
        (querySnapshot) => {
          if (querySnapshot.data()?.steg === 0) {
            navigate("/startaktivitet");
          } else if (querySnapshot.data()?.steg === 4) {
            setShowPopUpLevel1(true);
            setPopupInnhold("bliKjent");
            handleFinishStartAkt(-1);
          }
        }
      );
      const retroStegDocRef = doc(firestore, teamBruker.uid, "retroSteg");
      const retroStegUnsubscribe = onSnapshot(
        retroStegDocRef,
        (querySnapshot) => {
          if (querySnapshot.data()?.steg === 0) {
            navigate("/retrospektiv");
          } else if (querySnapshot.data()?.steg === 8 && retroNummer === 1) {
            //Bytte til antall steg vi får og hva som skal skje når man er ferdig
            setShowPopUpLevel2(true);
            handleNextStep("retroSteg", -1);
          }
        }
      );
      return () => {
        startAktivitetUnsubscribe();
        retroStegUnsubscribe();
      };
    }
  }, [teamBruker]);

  const handleClosePopUp = () => {
    setShowPopUpLevel1(false);
    setShowPopUpLevel2(false);
    // handleCloseLevelPopUp();
  };
  const handleCloseMaalPopUp = () => {
    setShowMaalPopUp(false);
  };
  const imageStyle = {
    width: "23%",
  };

  return (
    <div
      style={{
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container alignItems="center" marginTop={"1%"}>
        <Grid item xs={10}>
          <Typography
            variant="h2"
            style={{ marginBottom: "1%", marginLeft: "5%" }}
          >
            Team: {teamNavn}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "right", paddingRight: "2%" }}>
          <Button variant="contained" onClick={handleSignOut}>
            Logg ut
          </Button>
        </Grid>
      </Grid>
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${wave})`,
          backgroundSize: "cover",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          paddingTop: isSmallScreen ? "6%" : "3%",
          paddingLeft: "5%",
          paddingRight: "8%",
        }}
      >
        <Grid
          container //container 1
          alignItems="center"
        >
          <Grid item xs={12}>
            <StartAktivitetButton level={teamLevel} />
          </Grid>
          <Grid item xs={12}>
            <RetroButton />
          </Grid>
          <Grid item xs={12}>
            <TeambuildingButton disabled={true} />
          </Grid>
        </Grid>

        <Grid
          container //container 2
          style={{
            textAlign: "center",
            justifyContent: "center",
            padding: "3% 0",
            alignItems: "flex-start",
            gap: "15%",
          }}
        >
          <Grid item xs={12}>
            <Tooltip
              sx={{ backgroundColor: "red" }}
              title={
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  For å låse opp dette nivået må teamet fullføre
                  start-aktiviteten
                </Typography>
              }
            >
              <img
                src={teamLevel > 0 ? teamConnectors_done : teamConnectors}
                alt="Level 1"
                style={imageStyle}
                onClick={() => setShowMaalPopUp(true)}
              />
            </Tooltip>
            <Tooltip
              sx={{ backgroundColor: "red" }}
              title={
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  For å låse opp dette nivået må teamet fullføre en retrospektiv
                </Typography>
              }
            >
              <img
                src={
                  teamLevel > 1
                    ? communicationExplorers_done
                    : communicationExplorers
                }
                alt="Level 2"
                style={imageStyle}
              />
            </Tooltip>
            <Tooltip
              sx={{ backgroundColor: "red" }}
              title={
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  For å låse opp dette nivået må teamet fullføre en
                  teambuildingsøvelse
                </Typography>
              }
            >
              <img
                src={teamLevel > 2 ? bondBuilders_done : bondBuilders}
                alt="Level 3"
                style={imageStyle}
              />
            </Tooltip>
            <Tooltip
              sx={{ backgroundColor: "red" }}
              title={
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  For å låse opp dette nivået må teamet fullføre 2
                  retrospektiver eller 2 teambuildingsøvelser
                </Typography>
              }
            >
              <img
                src={teamLevel > 3 ? dreamTeam_done : dreamTeam}
                alt="Level 4"
                style={imageStyle}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Popup overskrift={popupOverskrift} tekst={popupTekst} />
          </Grid>
        </Grid>
        {showPopUpLevel1 && (
          <LevelPopUp
            onClose={handleClosePopUp}
            level={1}
            message={
              "Målene dere satt i Start-aktiviteten finner du ved å klikke på Nivå1-ikonet på hjem-siden!"
            }
          />
        )}
        {showMaalPopUp && teamLevel > 0 && (
          <MaalPopUp onClose={handleCloseMaalPopUp} maalene={startAktMaal} />
        )}
        {showPopUpLevel2 && (
          <LevelPopUp
            onClose={handleClosePopUp}
            level={2}
            message={
              "Målene dere satt i retrospektiven finner du ved å klikke på Nivå2-ikonet på hjem-siden!"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Hjem;
