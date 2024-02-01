import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase_setup/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { teamInfo } from "../constants";
import wave from "../wavyBackground.svg";
import notWave from "../notWavyBackground.svg";
import Hjem from "./Hjem";
import { useTeamContext } from "../TeamContext";
import { useMediaQuery } from "@mui/material";

const LoggInn = () => {
  const [teamKode, setTeamKode] = useState("");
  const { teamBruker, setTeamBruker } = useTeamContext();
  const [error, setError] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery("(max-width: 1100px)");

  //Hjelpefunksjon som kobler teamkoden til "fake" email og passord
  const setLoginInfo = (teamKode: string) => {
    const teamLogin = teamInfo[teamKode] || { email: "", password: "" };
    return teamLogin;
  };

  //Login funksjon som bruker firebase signIn
  const handleJoinTeam = async () => {
    try {
      setError(false);
      const { email, password } = setLoginInfo(teamKode);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(true);
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
      setTeamBruker(bruker);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {teamBruker ? (
        <>
          <Hjem handleSignOut={handleSignOut} />
        </>
      ) : (
        <div
          style={{
            height: "100vh",
            overflow: "auto",
            backgroundImage: isSmallScreen ? `url(${notWave})` : `url(${wave})`,
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: isSmallScreen ? "40% 10% 0 10%" : "28% 25% 0 25%",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h3">Skap Drømmeteamet!</Typography>
            <Typography variant="h6" mb={"2%"}>
              Bruk denne nettsiden for å forbedre samarbeidet i teamet og øke
              bevisstheten rundt Imposter Syndrome.
            </Typography>

            <TextField
              name="teamKode"
              required
              variant="filled"
              id="teamKode"
              label="Team kode"
              autoFocus
              value={teamKode}
              onChange={(e) => setTeamKode(e.target.value)}
              style={{ width: "30%" }}
            />

            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleJoinTeam}
            >
              Bli med i teamet
            </Button>
            {error && (
              <Alert
                severity="error"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 999,
                  width: "40%",
                  margin: "auto",
                  justifyContent: "center",
                }}
              >
                {
                  "Noe gikk galt under innloggingen! Vennligst sjekk at du har en gyldig teamkode"
                }
              </Alert>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoggInn;
