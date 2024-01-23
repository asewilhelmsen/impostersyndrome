import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleCloseLevelPopUp = () => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);

  //Ref steg
  const stegRef = doc(teamRef, "startAktivitetSteg");

  try {
    setDoc(stegRef, {
      steg: -1,
      samtaleSteg: 0,
    });
  } catch (err) {
    console.log("Kunne ikke lukke levelPopUp!", err);
  }
};

export default handleCloseLevelPopUp;
