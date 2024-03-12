import { useState } from "react";
import StepsRetro from "../components/StepsRetro";
import SkrivLapper from "../components/Retro/SkrivLapper";
import DiskuterLapper from "../components/Retro/DiskuterLapper";
import DotVoting from "../components/Retro/DotVoting";
import NyeMaal from "../components/Retro/NyeMaal";
import StatusMaal from "../components/Retro/StatusMaal";
import PositivTenking from "../components/Retro/PositivTenking";
import RetroStart from "../components/Retro/RetroStart";
import handleLeggTilPA from "../firebase/handles/handleLeggTilPA";
import { Maalene } from "../interfaces";

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
  const [listeUncheckedMaal, setListeUncheckedMaal] = useState<Maalene[]>([]);

  const handleNesteDisabled = (disabled: boolean) => {
    setNesteDisabled(disabled);
  };

  const handleOppdatertListe = (liste: string[]) => {
    setOppdatertListe(liste);
  };

  const handleRetroStart = (started: boolean) => {
    setStartetRetro(started);
  };
  //Oppdaterer firebase med den positive setningen som fikk flest
  const onLeggTilPA = (tekst: string) => {
    handleLeggTilPA(tekst);
  };

  const handleLeggTilUnCheckedMaal = (maalListe: Maalene[]) => {
    setListeUncheckedMaal(maalListe);
  };
  const stepComponents = [
    <StatusMaal
      onLagre={handleNesteDisabled}
      leggTilMaal={handleLeggTilUnCheckedMaal}
    />,
    <PositivTenking onSendInn={handleNesteDisabled} leggTilPA={onLeggTilPA} />,
    <SkrivLapper
      onSkrivFerdig={handleNesteDisabled}
      overskrift="Skriv individuelt hva som har gått bra"
      forklaring={
        <>
          <b>1.</b> Sett en timer på 5 minutter når alle er klare.
          <br />
          <br />
          <b>2. </b> Skriv individuelt hva som gikk bra i denne sprinten. Legg
          til så mange lapper du ønsker.
          <br /> <br />
          <b>3. </b> Gå videre når alle føler seg ferdig eller tiden er ute.
        </>
      }
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
        <>
          <b>1.</b> Sett en timer på 5 minutter når alle er klare.
          <br />
          <br />
          <b>2. </b> Skriv individuelt hva som kunne gått bedre i denne
          sprinten. Legg til så mange lapper du ønsker.
          <br /> <br />
          <b>3. </b> Gå videre når alle føler seg ferdig eller tiden er ute.
        </>
      }
      aktivitet="bedrePostIts"
    />,
    <DiskuterLapper
      onDiskuterFerdig={handleNesteDisabled}
      overskrift="Del tanker og erfaringer"
      forklaring={
        <>
          <b>1.</b> Gå gjennom lappene og diskuter hva dere mener kunne gått
          bedre. Pass på at alle får delt sitt synspunkt. <br />
          <br /> <b>2.</b> Slett lapper dere mener har samme innhold slik at det
          bare er én lapp per tanke/erfaring.
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
          nyeMaal={listeUncheckedMaal}
        />
      ) : (
        <RetroStart onRetroStart={handleRetroStart} />
      )}
    </>
  );
};

export default Retro;
