import { Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import handleTruthOrLie from "../firebase/handles/handleTruthOrLie";
import getTruthOrLie from "../firebase/getData";

interface Data {
  id: string;
  truth1: string;
  truth2: string;
  lie: string;
}

const TruthOrLie = ({ user }: { user: any }) => {
  //Flyttes for å bruke der man skal ha truth or lies
  const [name, setName] = useState("");
  const [truth1, setTruth1] = useState("");
  const [truth2, setTruth2] = useState("");
  const [lie, setLie] = useState("");

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

  //Foreløpig for truth or lie data
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      //const submissions = await getTruthLie();
      // setData(submissions);
    };

    fetchData();
  }, []);
  return (
    <>
      <Typography variant="h2">Truth or Lie</Typography>
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
  );
};

export default TruthOrLie;
