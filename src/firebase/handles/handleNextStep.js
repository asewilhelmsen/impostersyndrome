import { collection, doc, updateDoc, increment } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleNextStep = (aktivitet, steg) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const stegRef = doc(teamRef, aktivitet);
  // For å kunne bruke samme på aktivitet for start aktivitet og for retro
  if (steg) {
    try {
      updateDoc(stegRef, {
        steg: steg,
      });
    } catch (err) {
      console.log("Kunne ikke oppdatere steg!", err);
    }
  } else {
    //Om steget ikke er spesifisert, øker med 1
    try {
      updateDoc(stegRef, {
        steg: increment(1),
      });
    } catch (err) {
      console.log("Kunne ikke oppdatere steg!", err);
    }
  }
};

export default handleNextStep;
