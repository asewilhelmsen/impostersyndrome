import { collection, doc, updateDoc, increment } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleNesteSamtale = () => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const stegRef = doc(teamRef, "startAktivitetSteg");

  try {
    updateDoc(stegRef, {
      samtaleSteg: increment(-1),
    });
  } catch (err) {
    console.log("Kunne ikke oppdatere samtale steg!", err);
  }
};

export default handleNesteSamtale;
