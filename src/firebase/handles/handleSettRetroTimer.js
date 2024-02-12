import { collection, doc, updateDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleSettRetroTimer = (startet) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const retroRef = doc(teamRef, "retrospektiv");

  try {
    updateDoc(retroRef, {
      braTimerStartet: startet,
    });
  } catch (err) {
    console.log("Kunne ikke oppdatere timer til retro", err);
  }
};

export default handleSettRetroTimer;
