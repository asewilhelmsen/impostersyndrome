import { collection, doc, updateDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleUpdateAntallTeambuilding = (antall) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const teamInfoRef = doc(teamRef, "teamInfo");

  try {
    updateDoc(teamInfoRef, { antallTeambuildingGjennomfort: antall });
  } catch (err) {
    console.log(
      "Kunne ikke oppdatere antall teambuildingsøvelser gjennomfort!",
      err
    );
  }
};

export default handleUpdateAntallTeambuilding;
