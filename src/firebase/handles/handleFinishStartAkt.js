import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleFinishStartAkt = (steg) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const stegRef = doc(teamRef, "startAktivitetSteg");

  try {
    setDoc(stegRef, {
      steg: steg,
      samtaleSteg: 0,
    });
  } catch (err) {
    console.log("Kunne ikke fullføre startaktiviteten!", err);
  }
};

export default handleFinishStartAkt;
