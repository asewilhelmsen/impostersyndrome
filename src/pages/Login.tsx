import { FormEvent, useEffect, useRef, useState } from "react";
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
import handleTruthOrLie from "../firebase/handles/handleTruthOrLie";
import getTruthOrLie from "../firebase/getData";

interface Data {
  id: string;
  truth1: string;
  truth2: string;
  lie: string;
}
const Login = () => {
  //Test for å skrive til database
  const [user, setUser] = useState(auth.currentUser);

  const [teamCode, setTeamCode] = useState("");

  //Flyttes for å bruke der man skal ha truth or lies
  const [name, setName] = useState("");
  const [truth1, setTruth1] = useState("");
  const [truth2, setTruth2] = useState("");
  const [lie, setLie] = useState("");

  //Foreløpig for truth or lie data
  const [data, setData] = useState<Data[]>([]);

  //Til å hente input verdiene fra statene og sende til databasen
  const submitTruthOrLie = (e: FormEvent) => {
    e.preventDefault();

    let data = {
      userId: user?.uid,
      name: name,
      submission: {
        truth1: truth1,
        truth2: truth2,
        lie: lie,
      },
    };

    handleTruthOrLie(data);

    //Tømme staten etter at det er sendt
    setName("");
    setTruth1("");
    setTruth2("");
    setLie("");
  };

  //Oppdatere staten når det skrives inn i input feltet, kan sikkert løses bedre
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "truth1":
        setTruth1(value);
        break;
      case "truth2":
        setTruth2(value);
        break;
      case "lie":
        setLie(value);
        break;
      default:
        break;
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

  //Funksjon for å logge ut
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  //For å hente truth or lie data
  const getData = async () => {
    try {
      const dataFirestore = await getTruthOrLie();
      if (dataFirestore) {
        setData(dataFirestore);
      }
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
          <form onSubmit={submitTruthOrLie}>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              name="name"
            />
            <input
              type="text"
              value={truth1}
              onChange={handleInputChange}
              name="truth1"
            />
            <input
              type="text"
              value={truth2}
              onChange={handleInputChange}
              name="truth2"
            />
            <input
              type="text"
              value={lie}
              onChange={handleInputChange}
              name="lie"
            />

            <button type="submit">Save</button>
          </form>
          <div>
            <button onClick={getData}>Get truth or lie</button>

            {data ? (
              <>
                <h2>Data from Firestore:</h2>
                <ul>
                  {data.map((item: Data) => (
                    <li key={item.id}>{JSON.stringify(item)}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div>NO data</div>
            )}
          </div>
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
