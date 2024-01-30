import { auth, firestore } from "./firebase_setup/firebase";
import { getDoc, doc, collection } from "@firebase/firestore";

//Tar inn stringen til det popup innholdet man er ute etter (eksempel: "velkommen" for teksten som skal stå i starten)
const getPopupInnhold = async (popupInnhold) => {
  const teamId = auth.currentUser.uid;

  try {
    const popupsRef = doc(firestore, teamId, "popup");
    const innholdRef = collection(popupsRef, "innhold");
    const popupRef = doc(innholdRef, popupInnhold);
    const docSnap = await getDoc(popupRef);
    return docSnap.data();
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

export default getPopupInnhold;
