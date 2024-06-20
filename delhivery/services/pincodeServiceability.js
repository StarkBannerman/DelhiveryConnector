import dotenv from 'dotenv'
import axios from 'axios';
dotenv.config()
const apiToken = process.env.TEENBAAN_API_KEY;
export async function getServiceablePincodes(pincode) { 
   try {
     const response = await axios.get(
       `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`,
       {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Token ${apiToken}`,
         },
       }
     );
     return response.data;
   } catch (error) {
     throw error;
   }
}