//For å koble teamkode sammen med epost og passord som blir brukt i Firebase authentiseringen
export const teamInfo: Record<string, { email: string; password: string }> = {
  [process.env.REACT_APP_T1_TEAMCODE as string]: {
    email: process.env.REACT_APP_T1_EMAIL as string,
    password: process.env.REACT_APP_T1_PASSWORD as string,
  },
  [process.env.REACT_APP_T2_TEAMCODE as string]: {
    email: process.env.REACT_APP_T2_EMAIL as string,
    password: process.env.REACT_APP_T2_PASSWORD as string,
  },
  [process.env.REACT_APP_T3_TEAMCODE as string]: {
    email: process.env.REACT_APP_T3_EMAIL as string,
    password: process.env.REACT_APP_T3_PASSWORD as string,
  },
  [process.env.REACT_APP_T4_TEAMCODE as string]: {
    email: process.env.REACT_APP_T4_EMAIL as string,
    password: process.env.REACT_APP_T4_PASSWORD as string,
  },
  [process.env.REACT_APP_T5_TEAMCODE as string]: {
    email: process.env.REACT_APP_T5_EMAIL as string,
    password: process.env.REACT_APP_T5_PASSWORD as string,
  },
  [process.env.REACT_APP_T6_TEAMCODE as string]: {
    email: process.env.REACT_APP_T6_EMAIL as string,
    password: process.env.REACT_APP_T6_PASSWORD as string,
  },
};
