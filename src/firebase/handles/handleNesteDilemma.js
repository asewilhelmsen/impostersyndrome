import { collection, doc, updateDoc, increment } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleNesteDilemma = () => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const stegRef = doc(teamRef, "dilemmaSteg");

  try {
    updateDoc(stegRef, {
      steg: increment(1),
    });
  } catch (err) {
    console.log("Kunne ikke oppdatere dilemma steg!", err);
  }
};

export default handleNesteDilemma;
