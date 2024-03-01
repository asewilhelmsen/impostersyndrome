import { useState } from "react";
import StepsRetro from "../components/StepsRetro";
import SkrivLapper from "../components/Retro/SkrivLapper";
import DiskuterLapper from "../components/Retro/DiskuterLapper";
import DotVoting from "../components/Retro/DotVoting";
import NyeMaal from "../components/Retro/NyeMaal";
import StatusMaal from "../components/Retro/StatusMaal";
import PositivTenking from "../components/Retro/PositivTenking";

const Retro = () => {
  /* "Mål siden sist",
    "Positive",  "Hva kunne gått bedre? - Skriv",
    "Hva kunne gått bedre? - Diskuter",
    "Kategoriser",
    "Tiltak",
    "Mål framover",*/
  const steps = [
    "Mål",
    "Positiv tenking",
    "Hva gikk bra? - Skriv",
    "Hva gikk bra? - Diskuter",
    "Hva kunne gått bedre? - Skriv",
    "Hva kunne gått bedre? - Diskuter",
    "Dot voting",
    "Ny målsetting",
  ];

  const [nesteDisabled, setNesteDisabled] = useState<boolean>(false);
  const [oppdatertListe, setOppdatertListe] = useState<string[]>([]);

  const handleNesteDisabled = (disabled: boolean) => {
    setNesteDisabled(disabled);
  };

  const handleOppdatertListe = (liste: string[]) => {
    setOppdatertListe(liste);
  };
  //Tror ikke vi trenger denne men må se litt nærmere på dette
  const handleMaalSubmit = () => {};

  const stepComponents = [
    <StatusMaal onLagre={handleNesteDisabled} />,
    <PositivTenking />,
    <SkrivLapper
      onSkrivFerdig={handleNesteDisabled}
      overskrift="Hva gikk bra? - Skriv"
      forklaring="Start tiden når alle er klare og skriv individuelt hva som har
      gått bra i denne sprinten. Legg til så mange lapper du ønsker."
      aktivitet="braPostIts"
    />,
    <DiskuterLapper
      onDiskuterFerdig={handleNesteDisabled}
      overskrift="Hva gikk bra? -Diskuter"
      forklaring="Gå gjennom lappene og diskuter hva som gikk bra"
      filtrer={false}
      onOppdatertListe={handleOppdatertListe}
    />,
    <SkrivLapper
      onSkrivFerdig={handleNesteDisabled}
      overskrift={"Hva kunne gått bedre? - Skriv"}
      forklaring={
        "Start tiden når alle er klare og skriv individuelt ned hva som kunne gått bedre i denne sprinten. "
      }
      aktivitet="bedrePostIts"
    />,
    <DiskuterLapper
      onDiskuterFerdig={handleNesteDisabled}
      overskrift="Hva kunne gått bedre? -Diskuter"
      forklaring={
        <>
          Gå gjennom lappene og diskuter hva som gikk bra. <br />
          <br /> Velg en person som fjerner de lappene som er like og klikker
          neste når alle er enig.
        </>
      }
      filtrer={true}
      onOppdatertListe={handleOppdatertListe}
    />,
    <DotVoting
      onOppdatertListe={handleOppdatertListe}
      onVotingFerdig={handleNesteDisabled}
    />,
    <NyeMaal
      onMaalSubmit={handleMaalSubmit}
      onMaalFerdig={handleNesteDisabled}
    />,
  ];

  return (
    <div>
      <StepsRetro
        nameList={steps}
        content={stepComponents}
        nesteDisabled={nesteDisabled}
        oppdatertListe={oppdatertListe}
      />
    </div>
  );
};

export default Retro;
