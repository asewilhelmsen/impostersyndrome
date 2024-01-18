import { Typography, Grid, Button, Card } from "@mui/material";
import { useEffect, useState } from "react";

interface Svar {
  id: string;
  sannhet1: string;
  sannhet2: string;
  logn: string;
}

const IcebreakerSvarKort = ({ svar }: { svar: Svar }) => {
  const [clickedLogn, setClickedLogn] = useState<string | null>(null);
  const [shuffledButtons, setShuffledButtons] = useState<string[]>([]);

  //For at de skal komme i tilfeldig rekkefølge på hver person
  useEffect(() => {
    const buttonsArray = [svar.sannhet1, svar.sannhet2, svar.logn];
    setShuffledButtons(buttonsArray.sort(() => Math.random() - 0.5));
  }, [svar]);

  const handleLognClick = (buttonText: string) => {
    setClickedLogn(buttonText);
  };
  return (
    <Grid item key={svar.id}>
      <Card
        sx={{
          backgroundColor:
            clickedLogn === svar.logn
              ? "#A5D79C"
              : clickedLogn === svar.sannhet1 || clickedLogn === svar.sannhet2
              ? "#FFC1BD"
              : "",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Typography> Navn: {svar.id}</Typography>
        {shuffledButtons.map((buttonText, index) => (
          <div style={{ marginTop: "8px" }} key={index}>
            <Button onClick={() => handleLognClick(buttonText)}>
              {buttonText}
            </Button>
          </div>
        ))}
      </Card>
    </Grid>
  );
};

export default IcebreakerSvarKort;
