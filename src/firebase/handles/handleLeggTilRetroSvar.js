import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";
import { v4 as uuidv4 } from "uuid";

const handleLeggTilRetroSvar = (liste, steg) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const retroRef = doc(teamRef, "retrospektiv");

  let stegRef = collection(retroRef, "braLapper");

  if (steg === "bra") {
    stegRef = collection(retroRef, "braLapper");
  } else if (steg === "bedreLapper") {
    stegRef = collection(retroRef, "bedreLapper");
  } else if (steg === "filtrertBedreLapper") {
    stegRef = collection(retroRef, "filtrertBedreLapper");
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
