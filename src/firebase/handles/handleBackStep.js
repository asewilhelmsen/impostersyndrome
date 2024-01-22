import { collection, doc, updateDoc, increment } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleBackStep = () => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const stegRef = doc(teamRef, "startAktivitetSteg");

  try {
    updateDoc(stegRef, {
      steg: increment(-1),
    });
  } catch (err) {
    console.log("Kunne ikke oppdatere steg!", err);
  }
};

export default handleBackStep;
