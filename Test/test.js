import { Router } from "express";
import { createShipment } from "../delhivery/shipmentServices.js";
import { getServiceablePincodes } from "../delhivery/services/pincodeServiceability.js";
import mailTransporter from "../mailer/transporter.js";
import dotenv from "dotenv"
import { delhiveryController } from "../delhivery/controllers/DelhiveryControllers.js";
import { extractShipmentData } from "../wix/services/webhookProcess.js";
dotenv.config();
const testRoutes = Router();

testRoutes.post('/', async (req, res) => { 
    try {
      const { shipment, orderdata } = req.body.data;
      //   const response = await createShipment(shipment);
      // const pincodes = await getServiceablePincodes("600071");
      //    await mailTransporter.sendMail({
      //         from: process.env.EMAIL_USER,
      //         to: 'arunthestark@gmail.com',
      //         subject: "Error Creating Shippment",
      //         text: 'Error Creating Shippment for order with order Number'
      //         });
      const shipmentData = await extractShipmentData(orderdata);
      //   await delhiveryController(shipmentData, orderdata);
      console.log(shipmentData);
      // await delhiveryController(shipment)
      res.status(200).json();
    } catch (error) {
        throw error 
    }
})

export default testRoutes;
