import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";
import { v4 as uuidv4 } from "uuid";

const handleLeggTilDotvotingStemmer = (retroNummer, liste) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const retroRef = doc(teamRef, "retrospektiv" + retroNummer);

  const stegRef = collection(retroRef, "dotVotingStemmer");

  const nyId = uuidv4();
  const svarRef = doc(stegRef, nyId);

  const stemmerObj = liste.reduce((acc, curr, index) => {
    acc[`svar${index + 1}`] = curr;
    return acc;
  }, {});

  try {
    setDoc(svarRef, stemmerObj);
  } catch (err) {
    console.log("Kunne ikke legge til dot voting stemmer!", err);
  }
};

export default handleLeggTilDotvotingStemmer;
