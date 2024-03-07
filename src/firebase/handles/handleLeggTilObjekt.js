import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";
import { v4 as uuidv4 } from "uuid";

const handleLeggTilObjekt = (retroNummer, liste, steg) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const retroRef = doc(teamRef, "retrospektiv" + retroNummer);

  const stegRef = collection(retroRef, steg);

  const nyId = uuidv4();
  const svarRef = doc(stegRef, nyId);

  const stemmerObj = liste.reduce((acc, curr, index) => {
    acc[`svar${index + 1}`] = curr;
    return acc;
  }, {});

  try {
    setDoc(svarRef, stemmerObj);
  } catch (err) {
    console.log("Kunne ikke legge til objekt!", err);
  }
};

export default handleLeggTilObjekt;
