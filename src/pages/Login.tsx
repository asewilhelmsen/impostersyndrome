import { FormEvent, useEffect, useRef, useState } from "react";
import handleSubmit from "../firebase/handles/handleSubmit";
import { collection, getDocs } from "@firebase/firestore";
import { auth, firestore } from "../firebase/firebase_setup/firebase";
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

interface Teams {
  id: string;
  // other fields...
}
const Login = () => {
  //Test for å skrive til database
  const dataRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(auth.currentUser);

  const [teamCode, setTeamCode] = useState("");

  //Til input felt
  const submithandler = (e: FormEvent) => {
    e.preventDefault();
    if (dataRef.current) {
      handleSubmit(dataRef.current.value);
      dataRef.current.value = "";
    }
  };

  //Test for å lage bruker - skal ikke brukes
  const signUp = async () => {
    try {
      const email = "team3@team3.com"; // replace with actual user credentials
      const password = "passord3"; // replace with actual user credentials

      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const setLoginInfo = (teamCode: string) => {
    const teamLogin = teamInfo[teamCode] || { email: "", password: "" };
    return teamLogin;
  };

  //Test for å logge inn
  const handleJoin = async () => {
    try {
      const { email, password } = setLoginInfo(teamCode);

      // const email = "user@example.com"; // replace with actual user credentials
      // const password = "password123"; // replace with actual user credentials

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  //Test for å logge ut
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  //For å lytte til når bruker blir satt
  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  //Test for å lese fra database
  const [data, setData] = useState<Teams[]>([]);

  useEffect(() => {
    console.log("henter data");
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "teams"));

      const newData: Teams[] = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() } as Teams);
      });

      setData(newData);
    };

    //  fetchData();
  }, []);

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
          <form onSubmit={submithandler}>
            <input type="text" ref={dataRef} />
            <button type="submit">Save</button>
          </form>
          <div>
            <h2>Data from Firestore:</h2>
            <ul>
              {data.map((item: Teams) => (
                <li key={item.id}>{JSON.stringify(item)}</li>
              ))}
            </ul>
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
                    onClick={handleJoin}
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
