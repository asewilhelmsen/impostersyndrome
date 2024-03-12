import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleFjernPostIt = (retroNummer, liste) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const retroRef = doc(teamRef, "retrospektiv" + retroNummer);

  try {
    updateDoc(retroRef, {
      bedrePostIts: null,
    });

    updateDoc(retroRef, {
      bedrePostIts: liste,
    });
  } catch (err) {
    console.log("Kunne ikke legge til retro svar!", err);
  }
};

export default handleFjernPostIt;
