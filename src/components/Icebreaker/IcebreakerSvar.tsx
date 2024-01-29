import { Typography, Grid } from "@mui/material";
import IcebreakerSvarKort from "./IcebreakerSvarKort";

//Dette kan settes i egen fil så det kan bruke samme overalt
interface Svar {
  id: string;
  sannhet1: string;
  sannhet2: string;
  logn: string;
}

const IcebreakerSvar = ({ alleSvar }: { alleSvar: Svar[] }) => {
  return (
    <>
      <Typography marginLeft={"5px"} variant="body2">
        Gå gjennom hvert kort sammen og klikk individuelt på det du tror er
        løgnen til hver person. Hvis kortet blir grønt har du gjettet riktig!
      </Typography>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent={"center"}
        sx={{ marginTop: "10px" }}
      >
        {alleSvar.map((svar: Svar) => (
          <IcebreakerSvarKort key={svar.id} svar={svar} />
        ))}
      </Grid>
    </>
  );
};

export default IcebreakerSvar;
