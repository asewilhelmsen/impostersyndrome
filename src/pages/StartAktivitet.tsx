import Steps from "../components/Stepper";
import Icebreaker from "../components/Icebreaker/Icebreaker";
import Forventninger from "../components/StartAktivitet/Forventninger";
import IPInformasjon from "../components/StartAktivitet/IPInformasjon";
import Samtalestarter from "../components/Samtalestarter";


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
    <Samtalestarter />,
    <Forventninger />,
  ];

  return (
    <div>
      <Steps nameList={steps} content={stepComponents} />
    </div>
  );
};

export default StartAktivitet;
