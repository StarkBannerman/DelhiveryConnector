import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const AUTH_PROVIDER_BASE_URL = "https://www.wixapis.com/oauth";

export async function getTokensFromWix(authCode) {
  return axios
    .post(`${AUTH_PROVIDER_BASE_URL}/access`, {
      code: authCode,
      client_secret: process.env.WIX_APP_SECRET,
      client_id: process.env.WIX_APP_ID,
      grant_type: "authorization_code",
    })
    .then((resp) => resp.data);
}

export async function getAccessToken(refreshToken) {
  try {
    return axios
      .post(`${AUTH_PROVIDER_BASE_URL}/access`, {
        refresh_token: refreshToken,
        client_secret: process.env.WIX_APP_SECRET,
        client_id: process.env.WIX_APP_ID,
        grant_type: "refresh_token",
      })
      .then((resp) => resp.data);
  } catch (e) {
    console.log(e);
  }
}
