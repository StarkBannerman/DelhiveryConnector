import { createShipment } from "../shipmentServices.js"
import { getServiceablePincodes } from "../services/pincodeServiceability.js"
import { sendNotServiceableEmail } from "../../mailer/mailTemplates.js"

export async function delhiveryController(shipmentData, orderData) {
  try {
    const serviceablePincodes = await getServiceablePincodes(shipmentData.pin);
    if (serviceablePincodes && serviceablePincodes?.delivery_codes.length > 0) {
      createShipment(shipmentData, orderData);
    } else {
      sendNotServiceableEmail(shipmentData);
    }
    return;
  } catch (error) {
    throw error;
  }
}