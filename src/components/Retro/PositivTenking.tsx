import { Typography } from "@mui/material";

import { useTeamContext } from "../../TeamContext";

const PositivTenking = () => {
  const { teamBruker } = useTeamContext();

  return (
    <>
      <Typography variant="h2">Positiv tenking</Typography>
      <Typography marginLeft={"5px"} variant="body1">
        Heihei
      </Typography>
    </>
  );
};

export default PositivTenking;
