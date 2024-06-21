import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function addRecord(orderNumber, waybill) {
  try {
    let body = {
      records: [
        {
          fields: {
            orderNumber,
            waybill,
            date: new Date().toLocaleDateString(),
          },
        },
      ],
    };
    const { data } = await axios.post(
      "https://api.airtable.com/v0/appDv9zAhoUlued2w/tblDng8zEua9dZXLp",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    );
    console.log("receord Added to Airatable");
  } catch (error) {
    throw error;
  }
}
