import mailTransporter from "./transporter.js";

export async function sendNotServiceableEmail(shipment) { 
    try {
const { name, order, pin, order_date, products_desc } = shipment;
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: "arunthestark@gmail.com",
          subject: `Shipment Not Serviceable - Order No: ${order}`,
          html: `
      <p>Hi team,</p>
      <p>This is to inform you that wix order with order number <strong>${order}</strong> dated <strong>${order_date}</strong> cannot be serviced as the provided pincode <strong>${pin}</strong> is not serviceable.</p>
      <p>Order Details:</p>
      <ul>
        <li>Order Number: ${order}</li>
        <li>Order Date: ${order_date}</li>
        <li>Pincode: ${pin}</li>
        <li>Products: ${products_desc}</li>
      </ul>
      <p>Please Do the needfull..</p>
      <p>Best regards,</p>
      <p>Arun</p>
    `,
        };
        await mailTransporter.sendMail(mailOptions);
    } catch (error) {
        throw error 
    }
}

export async function sendErrorEmail(shipment) { 
    const { name, order, pin, order_date, products_desc } = shipment;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "arunthestark@gmail.com",
      subject: `Shipment Not Created for Order - Order No: ${order}`,
      html: `
      <p>Hi team,</p>
      <p>This is to inform you that wix order with order number <strong>${order}</strong> was not created</p>
      <p>Order Details:</p>
      <ul>
        <li>Order Number: ${order}</li>
        <li>Order Date: ${order_date}</li>
        <li>Pincode: ${pin}</li>
        <li>Products: ${products_desc}</li>
      </ul>
      <p>Please Do the needfull..</p>
      <p>Best regards,</p>
      <p>Arun</p>
    `,
    };
}