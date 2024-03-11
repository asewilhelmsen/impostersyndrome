import { Grid } from "@mui/material";
import PostIt from "./PostIt";

const TavlePostIt = ({
  liste,
  onClick,
  selectedPostIts,
  onDelete,
}: {
  liste: string[];
  onClick?: (tekst: string) => void;
  selectedPostIts?: string[];
  onDelete?: (index: number) => void;
}) => {
  return (
    <Grid item xs={9}>
      <div
        style={{
          border: "5px solid ",
          borderColor: "#7D97F4",
          borderRadius: "20px",
          padding: "20px",
          backgroundColor: "white",
          minHeight: "350px",
        }}
      >
        <Grid container spacing={2} justifyContent="flex-start">
          {liste &&
            liste.map((tekst: string, index: number) => (
              <Grid item xs={12} md={2} key={index}>
                <PostIt
                  tekst={tekst}
                  onClick={onClick ? () => onClick(tekst) : undefined}
                  selected={selectedPostIts?.includes(tekst)}
                  onDelete={onDelete ? () => onDelete(index) : undefined}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </Grid>
  );
};

export default TavlePostIt;
