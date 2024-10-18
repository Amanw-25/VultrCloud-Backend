import { config } from "dotenv";
config();

const appconfig = {
  URI: process.env.DATABASE_URI,
  PORT: process.env.PORT,
  REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXP,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP,
};

export { appconfig };
