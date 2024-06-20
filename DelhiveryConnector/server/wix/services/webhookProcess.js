export async function extractShipmentData(webhookData) {
  const { billingInfo, lineItems, createdDate, priceSummary, paymentStatus } =
    webhookData;
  const { contactDetails, address } = billingInfo;

  return {
    name: contactDetails.firstName + " " + contactDetails.lastName,
    add: address?.addressLine,
    pin: address?.postalCode,
    city: address?.city,
    state: address?.subdivisionFullname,
    country: address?.countryFullname,
    phone: contactDetails?.phone,
    order: webhookData.number,
    payment_mode: paymentStatus === "PAID" ? "Prepaid" : "COD",
    return_pin: "",
    return_city: "",
    return_phone: "",
    return_add: "",
    return_state: "",
    return_country: "",
    products_desc: lineItems
      .map((item) => item?.productName?.original)
      .join(", "),
    hsn_code: "",
    cod_amount:
      parseFloat(priceSummary.shipping.amount) === 0
        ? parseFloat(priceSummary.total.amount) + 20
        : parseFloat(priceSummary.total.amount) +
          parseFloat(priceSummary.shipping.amount),
    order_date: new Date(createdDate).toLocaleDateString(),
    total_amount: parseFloat(priceSummary.total.amount),
    seller_add:
      "Saibaba road, Thubarahalli, Munnekollal, Bengaluru, Karnataka 560037",
    seller_name: "Teenbaan",
    seller_inv: webhookData.number,
    quantity: lineItems.reduce((acc, item) => acc + item.quantity, 0),
    waybill: "",
    shipment_width: "100",
    shipment_height: "100",
    shipment_length: "100",
    weight: "",
    seller_gst_tin: "",
    shipping_mode: "Surface",
    address_type: "",
  };
}
