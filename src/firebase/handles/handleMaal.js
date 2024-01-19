import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleMaal = (maal) => {
  const teamId = auth.currentUser?.uid;

  //Refere til den collectionen vi vil sende til
  const teamRef = collection(firestore, teamId);
  const forventningerRef = doc(teamRef, "forventninger");
  const maalRef = collection(forventningerRef, "maal");
  const startAktMaalRef = doc(maalRef, "startAktMaal");

  try {
    setDoc(startAktMaalRef, maal);
  } catch (err) {
    console.log("Kunne ikke sende mål!", err);
  }
};

export default handleMaal;
