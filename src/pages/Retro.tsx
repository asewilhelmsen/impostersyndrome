import { useState } from "react";
import StepsRetro from "../components/StepsRetro";
import SkrivLapper from "../components/Retro/SkrivLapper";
import DiskuterLapper from "../components/Retro/DiskuterLapper";
import DotVoting from "../components/Retro/DotVoting";
import NyeMaal from "../components/Retro/NyeMaal";
import StatusMaal from "../components/Retro/StatusMaal";
import PositivTenking from "../components/Retro/PositivTenking";
import RetroStart from "../components/Retro/RetroStart";

const Retro = () => {
  const steps = [
    "Status",
    "Positiv bekreftelse",
    "Hva gikk bra?",
    "Diskuter det som gikk bra",
    "Hva kunne gått bedre?",
    "Diskuter hva som kunne gått bedre",
    "Dot-voting",
    "Målsetting",
  ];

  const [nesteDisabled, setNesteDisabled] = useState<boolean>(false);
  const [oppdatertListe, setOppdatertListe] = useState<string[]>([]);
  const [startetRetro, setStartetRetro] = useState<boolean>(false);

  const handleNesteDisabled = (disabled: boolean) => {
    setNesteDisabled(disabled);
  };

  const handleOppdatertListe = (liste: string[]) => {
    setOppdatertListe(liste);
  };

  const handleRetroStart = (started: boolean) => {
    setStartetRetro(started);
  };

  const stepComponents = [
    <StatusMaal onLagre={handleNesteDisabled} />,
    <PositivTenking onSendInn={handleNesteDisabled} />,
    <SkrivLapper
      onSkrivFerdig={handleNesteDisabled}
      overskrift="Skriv individuelt hva som har gått bra"
      forklaring="Start nedtellingen på 5 minutter når alle er klare og skriv individuelt hva som har
      gått bra i denne sprinten. Legg til så mange lapper du ønsker. Du kan ikke legge inn
      flere når tiden er ute."
      aktivitet="braPostIts"
    />,
    <DiskuterLapper
      onDiskuterFerdig={handleNesteDisabled}
      overskrift="Del tanker og erfaringer"
      forklaring="Gå gjennom lappene og diskuter hva dere mener har gått bra. Pass på at alle får delt sitt synspunkt."
      filtrer={false}
      onOppdatertListe={handleOppdatertListe}
    />,
    <SkrivLapper
      onSkrivFerdig={handleNesteDisabled}
      overskrift={"Skriv individuelt hva som kunne gått bedre"}
      forklaring={
        "Start nedtellingen på 5 minutter når alle er klare og skriv individuelt hva som kunne gått bedre i denne sprinten. Legg til så mange lapper du ønsker. Du kan ikke legge inn flere når tiden er ute."
      }
      aktivitet="bedrePostIts"
    />,
    <DiskuterLapper
      onDiskuterFerdig={handleNesteDisabled}
      overskrift="Del tanker og erfaringer"
      forklaring={
        <>
          Gå gjennom lappene og diskuter hva dere mener kunne gått bedre. Pass
          på at alle får delt sitt synspunkt. <br />
          <br /> Slett lapper dere mener har samme innhold slik at det bare er
          én lapp per tanke/erfaring.
        </>
      }
      filtrer={true}
      onOppdatertListe={handleOppdatertListe}
    />,
    <DotVoting
      onOppdatertListe={handleOppdatertListe}
      onVotingFerdig={handleNesteDisabled}
    />,
    <NyeMaal onMaalFerdig={handleNesteDisabled} />,
  ];

  return (
    <>
      {startetRetro ? (
        <StepsRetro
          nameList={steps}
          content={stepComponents}
          nesteDisabled={nesteDisabled}
          oppdatertListe={oppdatertListe}
          onRetroStart={handleRetroStart}
        />
      ) : (
        <RetroStart onRetroStart={handleRetroStart} />
      )}
    </>
  );
};

export default Retro;
