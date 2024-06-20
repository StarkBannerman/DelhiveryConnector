import axios from 'axios'
import dotenv from 'dotenv';
import { sendErrorEmail } from '../mailer/mailTemplates.js';
dotenv.config();

const pickupLocation = {
  name: "TEENBAAN SURFACE",
  add: "Teenbaan E-Commerce Office, Near Blue Super market,Sai baba temple road, Munnekollala",
  city: "Bengaluru",
  pin_code: 560037,
  country: "India",
  phone: "9842646076",
};
export async function createShipment(shipmentData) {
  const url = "https://track.delhivery.com/api/cmu/create.json";
  const headers = {
    "Content-Type": "text/plain",
    Accept: "*/*",
    Authorization: `Token ${process.env.TEENBAAN_API_KEY}`,
  };
  const payload = {
    format: "json",
    data: {
      shipments: [shipmentData],
      pickup_location: pickupLocation,
    },
  };
const formattedPayload = `format=json&data=${JSON.stringify(payload.data)}`;
  try {
    const response = await axios.post(url, formattedPayload, { headers });
    console.log(response.data.success);
    if (response.data.success !=true) { 
      await sendErrorEmail(shipmentData);
    } 
    console.log(response.data)
    return response.data;
  } catch (error) {
     await sendErrorEmail(shipmentData);
      console.error(
        error.status,
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}


 


