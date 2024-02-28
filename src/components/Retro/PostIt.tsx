import { Typography, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PostIt = ({
  tekst,
  onClick,
  selected,
  onDelete,
}: {
  tekst: string;
  onClick?: () => void;
  selected?: boolean;
  onDelete?: () => void;
}) => {
  return (
    <Card
      style={{
        backgroundColor: selected ? "#7D97F4" : "#ffff99",
        height: "100px",
        position: "relative",
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography width={"100%"} textAlign={"center"} variant="body1">
          {tekst}
        </Typography>
        {onDelete && (
          <IconButton
            style={{ position: "absolute", top: -5, right: -5 }}
            onClick={onDelete}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default PostIt;
