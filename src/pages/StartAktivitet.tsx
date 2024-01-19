import Steps from "../components/Stepper";
import Icebreaker from "../components/Icebreaker/Icebreaker";
import Forventninger from "../components/StartAktivitet/Forventninger";
import IPInformasjon from "../components/StartAktivitet/IPInformasjon";

const Step3Content = () => <div>This is the content for Step 3</div>;

const StartAktivitet = () => {
  const steps = [
    "Icebreaker",
    "Lær mer om Imposter Phenomenon",
    "Samtalestarter",
    "Forventningsavklaringer",
  ];
  const stepComponents = [
    <Icebreaker />,
    <IPInformasjon />,
    <Step3Content />,
    <Forventninger />,
  ];

  return (
    <div>
      <Steps nameList={steps} content={stepComponents} />
    </div>
  );
};

export default StartAktivitet;
