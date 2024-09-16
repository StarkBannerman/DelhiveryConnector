import EventEmitter from "events";
import { extractShipmentData } from "../wix/services/webhookProcess.js";
import { delhiveryController } from "./controllers/DelhiveryControllers.js";

const shippingEvents = new EventEmitter();
shippingEvents.on("createLabel", async (orderData) => {
  const shipmentData = await extractShipmentData(orderData);
  await delhiveryController(shipmentData, orderData);
});
export default shippingEvents;
