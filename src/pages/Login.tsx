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
import Home from "./Home";
import getTeamInfo from "../firebase/getTeamInfo";

const Login = () => {
  //Test for å skrive til database
  const [user, setUser] = useState(auth.currentUser);
  const [teamCode, setTeamCode] = useState("");

  //Hjelpefunksjon som kobler teamkoden til "fake" email og passord
  const setLoginInfo = (teamCode: string) => {
    const teamLogin = teamInfo[teamCode] || { email: "", password: "" };
    return teamLogin;
  };

  //Login funksjon som bruker firebase signIn
  const handleJoinTeam = async () => {
    try {
      const { email, password } = setLoginInfo(teamCode);
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
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  //For å lytte til når bruker blir satt og om det er endring i brukeren
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const [teamData, setTeamData] = useState<string[]>([]);

  //Hente info om teamet
  const getTeamData = async () => {
    try {
      const dataFirestore = await getTeamInfo();
      if (dataFirestore) {
        setTeamData(dataFirestore);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  //For å lytte til når bruker blir satt og om det er endring i brukeren
  useEffect(() => {
    console.log("henter team data");
    getTeamData();
  }, [user]);

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
      {user ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <Home teamData={teamData} />
        </>
      ) : (
        <>
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
                alt="Team working together"
                src={startImg}
              />
              <Typography variant="h3" sx={{ mt: 5 }}>
                The Imposter Phenomenon
              </Typography>
              <Typography variant="h4">
                This website will help your team connect, work better together
                and be aware of the imposter feeling.
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
                        name="teamCode"
                        required
                        variant="filled"
                        fullWidth
                        id="teamCode"
                        label="Team code"
                        autoFocus
                        value={teamCode}
                        onChange={(e) => setTeamCode(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleJoinTeam}
                  >
                    Join team
                  </Button>
                </Box>
              </Box>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
