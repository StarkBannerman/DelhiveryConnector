import { Router } from "express";
const webhooksRoutes = Router();
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import { extractShipmentData } from "../services/webhookProcess.js";
import { createShipment } from "../../delhivery/shipmentServices.js";
import { delhiveryController } from "../../delhivery/controllers/DelhiveryControllers.js";
dotenv.config();
const PUBLIC_KEY = process.env.WIX_PUBLIC_KEY;
webhooksRoutes.post("/order-approved", async (req, res) => {
    try {
    const data = jwt.verify(req.body, PUBLIC_KEY);
    const parsedData = JSON.parse(data.data);
    const instanceId = parsedData.instanceId;
    const orderInfo = JSON.parse(parsedData.data);
    const orderData = orderInfo?.actionEvent?.body?.order;
    const shipmentData = await extractShipmentData(orderData)
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
