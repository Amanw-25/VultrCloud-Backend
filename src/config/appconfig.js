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
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  DATA_API_KEY: process.env.DATA_API_KEY,
  EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
  EMAILJS_USER_SECRET: process.env.EMAILJS_USER_SECRET,
  OPENCAGE_API_KEY:process.env.OPENCAGE_API_KEY,
  OLAMAPS_API_KEY: process.env.OLAMAPS_API_KEY
};

export { appconfig };
