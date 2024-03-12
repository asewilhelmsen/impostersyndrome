import { collection, doc, updateDoc, arrayUnion } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleLeggTilRetroSvar = (retroNummer, element, steg) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const retroRef = doc(teamRef, "retrospektiv" + retroNummer);

  let fieldName = "braPostIts";

  if (steg === "bedrePostIts") {
    fieldName = "bedrePostIts";
  }

  try {
    updateDoc(retroRef, { [fieldName]: arrayUnion(element) });
  } catch (err) {
    console.log("Kunne ikke legge til retro svar!", err);
  }
};

export default handleLeggTilRetroSvar;
