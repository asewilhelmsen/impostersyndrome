import { Typography, TextField, Grid, Button, Card } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import handleTruthOrLie from "../firebase/handles/handleTruthOrLie";
import getTruthOrLie from "../firebase/getData";

interface Data {
  id: string;
  truth1: string;
  truth2: string;
  lie: string;
  submissionStatus: boolean;
}

const TruthOrLie = ({ user }: { user: any }) => {
  //Flyttes for å bruke der man skal ha truth or lies
  const [name, setName] = useState("");
  const [truth1, setTruth1] = useState("");
  const [truth2, setTruth2] = useState("");
  const [lie, setLie] = useState("");

  //For å vise spinner
  const [loading, setLoading] = useState(false);

  //Foreløpig for truth or lie data
  const [data, setData] = useState<Data[]>([]);

  //Til å hente input verdiene fra statene og sende til databasen
  const submitTruthOrLie = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");

    setLoading(true);

    let data = {
      userId: user?.uid,
      name: name,
      submission: {
        truth1: truth1,
        truth2: truth2,
        lie: lie,
      },
    };
    console.log("data", data);

    handleTruthOrLie(data);

    // await updateSubmissionStatus(user?.uid);

    //Tømme staten etter at det er sendt
    setLoading(false);
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

  //For å hente truth or lie data
  const getData = async () => {
    console.log("get data");
    try {
      const dataFirestore = await getTruthOrLie();
      if (dataFirestore) {
        setData(dataFirestore);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  //Sjekker om alle brukerene har submittet
  const allUsersSubmitted = data.every((user) => user.submissionStatus);

  return (
    <>
      <Typography variant="h2">Truth or Lie</Typography>
      <form onSubmit={submitTruthOrLie}>
        <Grid container direction="column" spacing={2} alignContent="center">
          <Grid item>
            <TextField
              name="name"
              required
              variant="filled"
              label="Your name"
              autoFocus
              value={name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              name="truth1"
              required
              variant="filled"
              label="Truth"
              autoFocus
              value={truth1}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              name="truth2"
              required
              variant="filled"
              label="Truth"
              autoFocus
              value={truth2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              name="lie"
              required
              variant="filled"
              label="Lie"
              autoFocus
              value={lie}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>

      <div>
        <button onClick={getData}>Get truth or lie</button>

        {data ? (
          <>
            <h2>Data from Firestore:</h2>
            <Grid container direction="row" spacing={2} alignContent="center">
              {data.map((item: Data) => (
                <Grid item>
                  <Card>
                    <Typography>Name: {JSON.stringify(item.id)}</Typography>
                    <Button>{JSON.stringify(item.truth1)}</Button>
                    <Button>{JSON.stringify(item.truth2)}</Button>
                    <Button>{JSON.stringify(item.lie)}</Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <div>NO data</div>
        )}
      </div>
    </>
  );
};

export default TruthOrLie;
