import config from "./config";

//For å koble teamkode sammen med epost og passord som blir brukt i Firebase authentiseringen
export const teamInfo: Record<
  string,
  { name: string; email: string; password: string }
> = {
  [config.T1_TEAMCODE]: {
    name: "Bachelor group 1",
    email: config.T1_EMAIL,
    password: config.T1_PASSWORD,
  },
  [config.T2_TEAMCODE]: {
    name: "Bachelor group 2",
    email: config.T2_EMAIL,
    password: config.T2_PASSWORD,
  },
  [config.T3_TEAMCODE]: {
    name: "Bachelor group 3",
    email: config.T3_EMAIL,
    password: config.T3_PASSWORD,
  },
};
