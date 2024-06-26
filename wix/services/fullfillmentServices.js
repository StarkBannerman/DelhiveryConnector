import axios from "axios";
import { getAccessToken } from "./tokenServices.js";
import dotenv from "dotenv";
import { sendShipmentErrorEmail } from "../../mailer/mailTemplates.js";
dotenv.config();
export async function createFulfillment(orderData, carrierInfo, shipmentData) {
  const url = `https://www.wixapis.com/ecom/v1/fulfillments/orders/${orderData?.id}/create-fulfillment`;
  const { access_token } = await getAccessToken(process.env.REFRESH_TOKEN);
  const lineItems = orderData.lineItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));
  const trackingInfo = {
    trackingNumber: carrierInfo?.packages[0]?.waybill,
    shippingProvider: "Delhivery",
    trackingLink: `https://www.delhivery.com/track/package/${carrierInfo?.packages[0]?.waybill}`,
  };
  const data = {
    fulfillment: {
      lineItems: lineItems,
      trackingInfo: trackingInfo,
    },
  };
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        authorization: access_token,
      },
    });
    console.log("Fullfillment Created");
    console.log(response.data);
  } catch (error) {
    await sendShipmentErrorEmail(shipmentData, error);
    console.error(
      "Error creating fulfillment:",
      error.response ? error.response.data : error.message
    );
  }
}
