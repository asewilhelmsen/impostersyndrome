import { Typography } from "@mui/material";

import { useTeamContext } from "../../TeamContext";

const StatusMaal = () => {
  const { teamBruker } = useTeamContext();

  return (
    <>
      <Typography variant="h2">Status av målsetting</Typography>
      <Typography marginLeft={"5px"} variant="body1">
        Heihei
      </Typography>
    </>
  );
};

export default StatusMaal;
