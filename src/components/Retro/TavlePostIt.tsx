import { Grid } from "@mui/material";
import PostIt from "./PostIt";

const TavlePostIt = ({ liste }: { liste: string[] }) => {
  return (
    <Grid item xs={8}>
      <div
        style={{
          border: "5px solid ",
          borderColor: "lightgrey",
          borderRadius: "20px",
          padding: "20px",
          backgroundColor: "white",
          minHeight: "400px",
        }}
      >
        <Grid container spacing={4}>
          {liste.map((tekst: string, index: number) => (
            <Grid item xs={2} md={3} key={index}>
              <PostIt tekst={tekst} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Grid>
  );
};

export default TavlePostIt;
