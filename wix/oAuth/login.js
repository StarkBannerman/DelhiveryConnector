import { Router } from "express";
const wixRoutes = Router();
import dotenv from 'dotenv'
dotenv.config()
import { getTokensFromWix } from "../services/tokenServices.js";

wixRoutes.get("/signup", async (req, res) => {
  try {
    try {
      const permissionRequestUrl = "https://www.wix.com/installer/install";
      const appId = process.env.WIX_APP_ID;
      const redirectUrl = `https://${req.get("host")}/wix/oauth/login`;
      // console.log(redirectUrl);
      const token = req.query.token;
      var url = `${permissionRequestUrl}?token=${token}&appId=${appId}&redirectUrl=${redirectUrl}`;
      res.redirect(url);
    } catch (e) {
      Sentry.captureException(e);
    }
  } catch (error) {
    throw error;
  }
});

wixRoutes.get("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const authorizationCode = req.query.code;
    const tokens = await getTokensFromWix(authorizationCode);
    res.status(200).json(tokens.refresh_token);
  } catch (error) {
    throw error;
  }
});

export default wixRoutes