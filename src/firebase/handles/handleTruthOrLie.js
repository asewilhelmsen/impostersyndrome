import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

//Fil for å legge til funskjoner som håndterer det som har med truth or lie å gjøre

const handleTruthOrLie = (data) => {
  //For å lage en egen collection som er for et team og en aktivitet
  const collectionName = data.userId + "_truthOrLie";
  //Refere til den collectionen vi vil sende til
  const ref = collection(firestore, collectionName);
  //For at man kan bestemme dokument navnet selv og ikke bare få en random id laget av firebase
  const docRef = doc(ref, data.name);

  //Data.submission er et objekt med truth1, truth2 og lie
  try {
    setDoc(docRef, data.submission);
  } catch (err) {
    console.log(err);
  }
};

export default handleTruthOrLie;
