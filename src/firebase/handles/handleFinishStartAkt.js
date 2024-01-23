import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleFinishStartAkt = (maalData) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);

  //Ref steg
  const stegRef = doc(teamRef, "startAktivitetSteg");

  //Ref mål
  const forventningerRef = doc(teamRef, "forventninger");
  const maalRef = collection(forventningerRef, "maal");
  const startAktMaalRef = doc(maalRef, "startAktMaal");

  //Ref level
  const teamInfoRef = doc(teamRef, "teamInfo");

  try {
    setDoc(stegRef, {
      steg: -1,
      samtaleSteg: 0,
    });
    setDoc(startAktMaalRef, maalData);
    setDoc(teamInfoRef, { level: 1 });
  } catch (err) {
    console.log("Kunne ikke fullføre startaktiviteten!", err);
  }
};

export default handleFinishStartAkt;
