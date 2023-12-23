import Steps from "../components/Stepper";
import Information from "../components/StartActivity/ImposterSyndrome";

const Step1Content = () => <div>This is the content for Step 2</div>;
const Step3Content = () => <div>This is the content for Step 3</div>;
const Step4Content = () => <div>This is the content for Step 4</div>;

const StartActivity = () => {
  const steps = [
    "Icebreaker",
    "Learn about Imposter Phenomenon",
    "Conversation",
    "Expectations",
  ];
  const stepComponents = [
    <Step1Content />,
    <Information />,
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
