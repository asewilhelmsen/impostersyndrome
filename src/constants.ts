import config from "./config";

export const teamInfo: Record<string, { email: string; password: string }> = {
  [config.T1_TEAMCODE]: {
    email: config.T1_EMAIL,
    password: config.T1_PASSWORD,
  },
  [config.T2_TEAMCODE]: {
    email: config.T2_EMAIL,
    password: config.T2_PASSWORD,
  },
  [config.T3_TEAMCODE]: {
    email: config.T3_EMAIL,
    password: config.T3_PASSWORD,
  },
};
