import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleAddMaal = (maalene, aktivitet, retroRef) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const forventningerRef = doc(teamRef, "forventninger");
  const maalRef = collection(forventningerRef, "maal");

  let aktivitetRef = doc(maalRef, "startAktMaal");

  if (aktivitet === "retro") {
    aktivitetRef = doc(maalRef, retroRef);
  }

  const updatedMaalene = maalene.reduce((acc, maal, index) => {
    acc[`${index + 1}`] = { tekst: maal.tekst, checked: false };
    return acc;
  }, {});

  try {
 setDoc(aktivitetRef, updatedMaalene);

  } catch (err) {
    console.error("Kunne ikke legge til mål!", err);
  }
};

export default handleAddMaal;
