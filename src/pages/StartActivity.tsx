import Steps from "../components/Stepper";
import Expectations from "../components/StartActivity/Expectations";

const Step1Content = () => <div>This is the content for Step 1</div>;
const Step2Content = () => <div>This is the content for Step 2</div>;
const Step3Content = () => <div>This is the content for Step 3</div>;

const StartActivity = () => {
  const steps = ["Icebreaker", "Learn about", "Conversation", "Expectations"];
  const stepComponents = [
    <Step1Content />,
    <Step2Content />,
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
