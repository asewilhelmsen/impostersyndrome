import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleOppdaterRetroNummer = (nummer, totalEllerAktiv) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const teamInfoRef = doc(teamRef, "teamInfo");

  let field = "antallRetroerGjennomfort";

  if (totalEllerAktiv === "retroNummer") {
    field = "retroNummer";
  }
  try {
    updateDoc(teamInfoRef, { [field]: nummer });
  } catch (err) {
    console.log("Kunne ikke oppdatere retro nummer!", err);
  }
};

export default handleOppdaterRetroNummer;
