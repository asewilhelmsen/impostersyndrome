import React, { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import ImposterSyndromePicture from "../../images/Information.svg";
import { useMediaQuery } from "@mui/material";

const IPInformasjon = ({
  onIPinfo,
}: {
  onIPinfo: (disabled: boolean) => void;
}) => {
  const [value, setValue] = useState(0);

  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    onIPinfo(false);
  });

  const sections = [
    {
      label: "Hva er det?",
      content: (
        <>
          Imposter syndrome er et utbredt fenomen der individers selvtillit og
          prestasjon påvirkes av en bekymring for å bli gjennomskuet for å ha
          mindre kompetanse enn det er forventet. Selv med betydelig ferdigheter
          undervurderer enkeltpersoner ofte seg selv og tilskriver suksess til
          flaks eller andre eksterne faktorer. På informatikkstudier med mange
          høyt presterende studenter er det vanlig å føle på Imposter syndrome.
          Dette gjelder også i IT-bransjen generelt der over&nbsp;
          <a href="https://www.teamblind.com/blog/58-percent-of-tech-workers-feel-like-impostors/">
            58%
          </a>
          &nbsp;av utviklere i selskaper som Facebook, Microsoft og Google
          rapporterer å oppleve imposter syndrome i jobben sin.
        </>
      ),
      example:
        "Nyutdannede Anders får en ettertraktet jobb, men mener han kun fikk den på grunn av flaks i intervjuspørsmålene og undervurderer egne kvalifikasjoner. Dette fører til unødvendig stress ved karrierestart, og Anders er nervøs for å starte i ny jobb.",
    },
    {
      label: "Årsaker",
      content: `
      Sammenligning med andre studenter kan føre til urealistiske forventninger og følelse av utilstrekkelighet, spesielt i samarbeidssituasjoner der man vurderer sin egen kompetanse mot andre. 
 
      
      Å være en del av en underrepresentert gruppe på grunn av f.eks kjønn eller etnisitet kan også forsterke imposter følelsen. Dersom individene har en følelse av å ikke høre til, kan det føre til tvil om egen kompetanse og en opplevelse av å ikke bli ansett som like dyktig som de andre på studiet.


      `,
      example:
        "Anna, en kvinnelig informatikkstudent, tror at hun bare fikk sommerjobben som utvikler på grunn av behovet for å fylle kvinnekvoten i IT-bransjen. Hun undervurderer sine egne ferdigheter og tilskriver suksessen sin til sitt kjønn.",
    },
    {
      label: "Effekter",
      content: `
      Imposter syndrome kan føre til tvil, angst og depresjon, og kan derfor påvirke studenters generelle mentale helse. Frykten for å bli avslørt kan føre til en negativ spiral som påvirker både motivasjon og prestasjon, som også kan hindrer læring og selvtillit.

      
      Imposter syndrome kan føre til overarbeid og overlevelsesmodus, noe som har en negativ innvirkning på studenters generelle trivsel. Dette hindrer personlig og faglig vekst ettersom studenter kan unngå nye utfordringer og muligheter, og tror at de ikke er kvalifiserte. Det kan til og med føre til at enkeltpersoner unngår teknologirelaterte yrker.  

      `,
      example:
        "Per fullfører et krevende gruppeprosjekt i informatikk og oppnår toppkarakterer sammen med teamet sitt. Til tross for dette føler han seg utilstrekkelig og tilskriver suksessen til de andre i gruppen. Han overarbeider seg for å kompensere for det han tror er manglende bidrag fra hans side og føler seg stadig mer presset og tviler på sine egne evner.",
    },
    {
      label: "Suksessfaktorer",
      content: `
      Flere suksessfaktorer er identifisert for å håndtere Imposter syndrome. Den første, som vi jobber med akkurat nå, er å øke bevisstheten om fenomenet og utbredelsen på informatikkstudiet. Teamarbeid og å bygge et støttende miljø er en annen suksessfaktor. Å fremme en følelse av tilhørighet og dyrke samarbeid og deling av erfaringer, i stedet for å ha et konkurransepreget miljø, er viktig. I tillegg er det essensielt å sette realistiske forventninger og gi jevnlig bekreftelse gjennom mestringsopplevelser.

      `,
      example:
        "Kari og Thomas samarbeider i et team. Etter at Kari fullfører en oppgave, føler Thomas at han ikke er like dyktig eller bidrar like mye. På samme måte føler Kari at hun ikke er like flink som Thomas, da han mestrer ting hun ikke kan. Etter en åpen samtale føler begge seg beroliget ved å oppdage at de deler de samme usikkerhetene.",
    },
  ];

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  return (
    <div>
      <Typography variant="h2">Imposter Syndrome</Typography>
      <Typography marginLeft={"5px"} variant="body1">
        Les og klikk individuelt gjennom: Hva er det?, Årsaker, Effekter og
        Suksessfaktorer. Når alle er ferdige kan dere gå til neste steg.
      </Typography>
      <Grid container marginTop={"2%"}>
        <Grid item xs={12} md={2}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          >
            {sections.map((section, index) => (
              <Tab key={index} label={section.label} />
            ))}
          </Tabs>
        </Grid>

        <Grid item xs={12} md={10}>
          {sections.map((section, index) => (
            <TabPanel key={index} value={value} index={index}>
              <Box width={"60%"} margin={isSmallScreen ? "auto" : "0 10%"}>
                <Typography component={"span"} variant="h5">
                  {section.label}
                </Typography>
                <Typography variant="body1" marginTop={"2%"}>
                  {section.content}
                </Typography>
                <Box
                  padding={1}
                  borderRadius={2}
                  mt={2}
                  border={1}
                  borderColor="primary.main"
                  bgcolor={"white"}
                  display={"flex"}
                  flexDirection={"row"}
                >
                  <img
                    src={ImposterSyndromePicture}
                    alt="Example illustration"
                    width={"100px"}
                  />
                  <Typography variant="body2" style={{ color: "#0E056E" }}>
                    {section.example}
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default IPInformasjon;
