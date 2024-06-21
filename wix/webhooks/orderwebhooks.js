import { Router } from "express";
const webhooksRoutes = Router();
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import { extractShipmentData } from "../services/webhookProcess.js";
import { createShipment } from "../../delhivery/shipmentServices.js";
import { delhiveryController } from "../../delhivery/controllers/DelhiveryControllers.js";
dotenv.config();
// const PUBLIC_KEY = process.env.WIX_PUBLIC_KEY;
const options = {
  algorithms: ["HS256"], // Specify the algorithms that your token can use
};

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr6o8fa7hfpNV2MTjyd4Q
uVr11/RtJbuLiP5T1+zF+5ddpmoMY4MPD76+14RY4JJZzf580XAD4ykS7rXlRETL
kgd8FDH3L16cF+mdABSDyKllfA5Sdyk0wBkUsoH5WpRPrqzcJtUKadJmbCpun3pX
iQG8dtGuvg3YhQIhLvLV6u+zGFEUlYpFUoaP1Zgz+aWG7V2N90+c7eBcpEopuICn
cKGmYpiIOccnCFlMDOTIEbVsT5XMTe4q0Yn2HVCiTur92F2VL/Kp5DYIMOOlG+jn
JU/f4/BJAPX+xA3onOFQov+UGHcJIOoIvTEkvSndK2FwH+sA6tbC51QvAw0jvaOo
cQIDAQAB
-----END PUBLIC KEY-----`;
webhooksRoutes.post("/order-approved", async (req, res) => {
  try {
    const data = jwt.verify(req.body, PUBLIC_KEY, options);
    const parsedData = JSON.parse(data.data);
    const instanceId = parsedData.instanceId;
    const orderInfo = JSON.parse(parsedData.data);
    const orderData = orderInfo?.actionEvent?.body?.order;
    const shipmentData = await extractShipmentData(orderData);
    await delhiveryController(shipmentData, orderData);
    res.status(200).json({ message: "Order Updated Webhook received" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

webhooksRoutes.post("/order-updated", async (req, res) => { 
  try {
     const data = jwt.verify(req.body, PUBLIC_KEY);
     const parsedData = JSON.parse(data.data);
     const instanceId = parsedData.instanceId;
    const orderInfo = JSON.parse(parsedData.data);
    // console.log(JSON.stringify(orderInfo))
    res.status(200).json({ message: "Order Updated Webhook received" });
  } catch (error) {
    throw error 
  }
})

export default webhooksRoutes;
