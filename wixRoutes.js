import { Router } from 'express'
import oauthRoutes from './wix/oAuth/login.js'
import webhooksRoutes from './wix/webhooks/orderwebhooks.js';
const wixRoutes = Router();
wixRoutes.use('/oauth', oauthRoutes)
wixRoutes.use("/webhooks", webhooksRoutes);

export default wixRoutes