import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";
// Funksjon for å oppdatere statusen til et mål i Firebase om det er checked eller ikke
const handleOppdaterMaalChecked = (aktivitet, retroRef, maalId, status) => {
  const teamId = auth.currentUser?.uid;
  const teamRef = collection(firestore, teamId);
  const forventningerRef = doc(teamRef, "forventninger");
  const maalRef = collection(forventningerRef, "maal");

  let aktivitetRef = doc(maalRef, "startAktMaal");

  if (aktivitet === "retro") {
    aktivitetRef = doc(maalRef, retroRef);
  }

  try {
    updateDoc(aktivitetRef, {
      [`${maalId}.checked`]: status,
    });
  } catch (error) {
    console.error("Feil ved oppdatering av målstatus i Firebase:", error);
  }
};

export default handleOppdaterMaalChecked;
