//import config from "./config";

import { env } from "node:process";

//For å koble teamkode sammen med epost og passord som blir brukt i Firebase authentiseringen
export const teamInfo: Record<string, { email: string; password: string }> = {
  [env.T1_TEAMCODE as string]: {
    email: env.T1_EMAIL as string,
    password: env.T1_PASSWORD as string,
  },
  [env.T2_TEAMCODE as string]: {
    email: env.T2_EMAIL as string,
    password: env.T2_PASSWORD as string,
  },
  [env.T3_TEAMCODE as string]: {
    email: env.T3_EMAIL as string,
    password: env.T3_PASSWORD as string,
  },
};
