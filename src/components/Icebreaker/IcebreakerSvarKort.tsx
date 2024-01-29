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
    <Grid item key={svar.id} xs={8} md={6} lg={4}>
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
          padding: "10px",
          margin: "auto",
        }}
      >
        <Typography
          width={"100%"}
          textAlign={"center"}
          variant="h5"
          sx={{
            textDecoration: "underline",
          }}
        >
          {svar.id}
        </Typography>
        {shuffledButtons.map((buttonText, index) => (
          <div style={{ marginTop: "5px", width: "100%" }} key={index}>
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                height: "40px",
                whiteSpace: "normal",
              }}
              onClick={() => handleLognClick(buttonText)}
            >
              {buttonText}
            </Button>
          </div>
        ))}
      </Card>
    </Grid>
  );
};

export default IcebreakerSvarKort;
