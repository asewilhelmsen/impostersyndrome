import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleLeggTilPA = (tekst) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const teamInfoRef = doc(teamRef, "teamInfo");

  try {
    updateDoc(teamInfoRef, { positivTenking: tekst });
  } catch (err) {
    console.log("Kunne ikke legge til positiv setning!", err);
  }
};

export default handleLeggTilPA;
