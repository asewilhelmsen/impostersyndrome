import Steps from "../components/Stepper";
import Icebreaker from "../components/Icebreaker/Icebreaker";
import { auth } from "../firebase/firebase_setup/firebase";
import Expectations from "../components/StartActivity/Expectations";
import Information from "../components/StartActivity/ImposterSyndrome";

const Step3Content = () => <div>This is the content for Step 3</div>;

const StartActivity = () => {
  //Må sjekke at det finnes en bruker ellerno
  const user = auth.currentUser;
  console.log("start activity user", user);

  const steps = [
    "Icebreaker",
    "Lær mer om Imposter Phenomenon",
    "Samtalestarter",
    "Forventningsavklaringer",
  ];
  const stepComponents = [
    <Icebreaker />,
    <Information />,
    <Step3Content />,
    <Expectations />,
  ];

  return (
    <div>
      <Steps nameList={steps} content={stepComponents} />
    </div>
  );
};

export default StartActivity;
