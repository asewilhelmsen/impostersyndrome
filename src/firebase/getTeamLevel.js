import { auth, firestore } from "./firebase_setup/firebase";
import { getDoc, doc } from "@firebase/firestore";

//Returnerer team infoen (level)
const getTeamLevel = async () => {
  const teamId = auth.currentUser.uid;

  try {
    const docRef = doc(firestore, teamId, "teamInfo");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().level;
    } else {
      //Håndtere feilmelding her
      console.log("Fant ikke dokument til team info");
      return 0;
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

export default getTeamLevel;
