import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";
import { v4 as uuidv4 } from "uuid";

const handleLeggTilRetroSvar = (braListe) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const retroRef = doc(teamRef, "retrospektiv");
  const braRef = collection(retroRef, "braLapper");

  const nyId = uuidv4();
  const svarRef = doc(braRef, nyId);

  const braObject = braListe.reduce((acc, curr, index) => {
    acc[`item${index + 1}`] = curr;
    return acc;
  }, {});

  try {
    setDoc(svarRef, braObject);
  } catch (err) {
    console.log("Kunne ikke legge til retro svar!", err);
  }
};

export default handleLeggTilRetroSvar;
