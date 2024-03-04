import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";
import { v4 as uuidv4 } from "uuid";

const handleLeggTilRetroSvar = (retroNummer, liste, steg) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const retroRef = doc(teamRef, "retrospektiv" + retroNummer);

  let stegRef = collection(retroRef, "braPostIts");

  if (steg === "bedrePostIts") {
    stegRef = collection(retroRef, "bedrePostIts");
  } else if (steg === "filtrertBedrePostIts") {
    stegRef = collection(retroRef, "filtrertBedrePostIts");
  } else if (steg === "dotVotingPostIts") {
    stegRef = collection(retroRef, "dotVotingPostIts");
  } else if (steg === "positivTenking") {
    stegRef = collection(retroRef, "positivTenking");
  }

  const nyId = uuidv4();
  const svarRef = doc(stegRef, nyId);

  const braObject = liste.reduce((acc, curr, index) => {
    acc[`svar${index + 1}`] = curr;
    return acc;
  }, {});

  try {
    setDoc(svarRef, braObject);
  } catch (err) {
    console.log("Kunne ikke legge til retro svar!", err);
  }
};

export default handleLeggTilRetroSvar;
