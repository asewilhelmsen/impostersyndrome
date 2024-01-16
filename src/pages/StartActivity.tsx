import Steps from "../components/Stepper";
import TruthOrLie from "../components/TruthOrLie";
import { auth } from "../firebase/firebase_setup/firebase";

const Step2Content = () => <div>This is the content for Step 2</div>;
const Step3Content = () => <div>This is the content for Step 3</div>;
const Step4Content = () => <div>This is the content for Step 4</div>;

const StartActivity = () => {
  //Må sjekke at det finnes en bruker ellerno
  const user = auth.currentUser;
  console.log("start activity user", user);

  const steps = ["Icebreaker", "Learn about", "Conversation", "Expectations"];
  const stepComponents = [
    <TruthOrLie user={user} />,
    <Step2Content />,
    <Step3Content />,
    <Step4Content />,
  ];

  return (
    <div>
      <Steps nameList={steps} content={stepComponents} />
    </div>
  );
};

export default StartActivity;
