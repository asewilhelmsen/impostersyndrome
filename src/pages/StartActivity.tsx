import TruthOrLie from "../components/TruthOrLie";
import { auth } from "../firebase/firebase_setup/firebase";

const StartActivity = () => {
  //Må sjekke at det finnes en bruker ellerno
  const user = auth.currentUser;
  console.log("start activity user", user);

  return (
    <>
      <div>Første side på start aktiviteten</div>
      <TruthOrLie user={user} />
    </>
  );
};

export default StartActivity;
