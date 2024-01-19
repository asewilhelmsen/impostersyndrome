import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase_setup/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { teamInfo } from "../constants";
import startImg from "../forsidebilde.png";
import wavyBackground from "../wavyBackground.svg";
import Hjem from "./Hjem";
import { useTeamContext } from "../TeamContext";

const LoggInn = () => {
  const [teamKode, setTeamKode] = useState("");
  const { teamBruker, setTeamBruker } = useTeamContext();

  //Hjelpefunksjon som kobler teamkoden til "fake" email og passord
  const setLoginInfo = (teamKode: string) => {
    const teamLogin = teamInfo[teamKode] || { email: "", password: "" };
    return teamLogin;
  };

  //Login funksjon som bruker firebase signIn
  const handleJoinTeam = async () => {
    try {
      const { email, password } = setLoginInfo(teamKode);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  //Funskjon for å registerer nye team - bare hjelpefunskjon til oss som kan brukes om vi vil lage flere teams
  const signUp = async () => {
    try {
      const email = "team3@team3.com"; // endre til det man vil sette
      const password = "passord3";

      //Firebase funksjon for authentisering
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  //Funksjon for å logge ut
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setTeamBruker(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  //For å lytte til når bruker blir satt og om det er endring i brukeren
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (bruker) => {
      console.log("bruker i onAuth", bruker?.uid);
      setTeamBruker(bruker);
    });
    return () => unsubscribe();
  }, []);

  //Foreløpig for bakgrunnen
  const waveBackgroundStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
  };

  return (
    <>
      {teamBruker ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <Hjem />
        </>
      ) : (
        <div style={containerStyle}>
          <img
            src={wavyBackground}
            alt="Wavy Background"
            style={waveBackgroundStyle}
          />
          <Container
            maxWidth="md"
            sx={{ alignItems: "center", textAlign: "center" }}
          >
            <Box
              component="img"
              sx={{
                mt: 4,
                height: 500,
                width: 750,
                maxHeight: { xs: 233, md: 280 },
                maxWidth: { xs: 350, md: 422 },
              }}
              alt="Team som jobber sammen illustrasjon"
              src={startImg}
            />
            <Typography variant="h3" sx={{ mt: 5 }}>
              The Imposter Phenomenon
            </Typography>
            <Typography variant="h4">
              This website will help your team connect, work better together and
              be aware of the imposter feeling.
            </Typography>

            <CssBaseline />
            <Box
              sx={{
                mt: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="teamKode"
                      required
                      variant="filled"
                      fullWidth
                      id="teamKode"
                      label="Team kode"
                      autoFocus
                      value={teamKode}
                      onChange={(e) => setTeamKode(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleJoinTeam}
                >
                  Bli med i teamet
                </Button>
              </Box>
            </Box>
          </Container>
        </div>
      )}
    </>
  );
};

export default LoggInn;
