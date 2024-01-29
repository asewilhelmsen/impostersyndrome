//import config from "./config";

//For å koble teamkode sammen med epost og passord som blir brukt i Firebase authentiseringen
export const teamInfo: Record<string, { email: string; password: string }> = {
  [process.env.T1_TEAMCODE as string]: {
    email: process.env.T1_EMAIL as string,
    password: process.env.T1_PASSWORD as string,
  },
  [process.env.T2_TEAMCODE as string]: {
    email: process.env.T2_EMAIL as string,
    password: process.env.T2_PASSWORD as string,
  },
  [process.env.T3_TEAMCODE as string]: {
    email: process.env.T3_EMAIL as string,
    password: process.env.T3_PASSWORD as string,
  },
};
