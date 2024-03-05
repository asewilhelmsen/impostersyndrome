import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleOppdaterRetroNummer = (nummer) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const teamInfoRef = doc(teamRef, "teamInfo");

  try {
    updateDoc(teamInfoRef, { antallRetroerGjennomfort: nummer });
  } catch (err) {
    console.log("Kunne ikke oppdatere retro nummer!", err);
  }
};

export default handleOppdaterRetroNummer;
