import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleUpdateLevel = (level) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const teamInfoRef = doc(teamRef, "teamInfo");

  try {
    updateDoc(teamInfoRef, { level: level });
  } catch (err) {
    console.log("Kunne ikke oppdatere level!", err);
  }
};

export default handleUpdateLevel;
