import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleAddMaal = (maalene) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const forventningerRef = doc(teamRef, "forventninger");
  const maalRef = collection(forventningerRef, "maal");
  const startAktMaalRef = doc(maalRef, "startAktMaal");

  const maalObject = maalene.reduce((acc, goal, index) => {
    acc[`maal${index + 1}`] = goal.tekst;
    return acc;
  }, {});

  try {
    setDoc(startAktMaalRef, maalObject);
  } catch (err) {
    console.log("Kunne ikke legge til mål!", err);
  }
};

export default handleAddMaal;
