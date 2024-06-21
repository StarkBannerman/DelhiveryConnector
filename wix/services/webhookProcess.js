export async function extractShipmentData(webhookData) {
  const { billingInfo, lineItems, createdDate, priceSummary, paymentStatus } =
    webhookData;
  const { contactDetails, address } = billingInfo;

  const packageDetails = () => {
    if (lineItems?.length === 1) {
      return {
        length: 25,
        width: 10,
        height: 5,
        weight: 400,
      };
    } else if (lineItems?.length === 2) {
      return {
        length: 25,
        width: 25,
        height: 5,
        weight: 800,
      };
    } else {
      return {
        length: 25,
        width: 25,
        height: 10,
        weight: 1000,
      };
    }
  };

  const packageDetailsResult = packageDetails();
  console.log(
    parseFloat(priceSummary.shipping.amount) === 0
      ? parseFloat(priceSummary.total.amount) + 20
      : parseFloat(priceSummary.total.amount)
  );
  const formatProductDesc = (lineItems) => {
    return lineItems
      .map((item) => {
        const { productName, descriptionLines } = item;
        const desc = descriptionLines
          .map((descLine) => {
            if (descLine.lineType === "COLOR") {
              return `${descLine.name.original}: ${descLine.color}`;
            } else {
              return `${descLine.name.original}: ${descLine.plainText.original}`;
            }
          })
          .join(", ");
        return `${productName.original} ${desc}`;
      })
      .join(", ");
  };

  return {
    name: `${contactDetails.firstName} ${contactDetails.lastName}`,
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
    products_desc: formatProductDesc(lineItems),
    hsn_code: "",
    cod_amount:
      parseFloat(priceSummary.shipping.amount) === 0.0
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
    shipment_width: packageDetailsResult.width,
    shipment_height: packageDetailsResult.height,
    shipment_length: packageDetailsResult.length,
    weight: packageDetailsResult.weight,
    seller_gst_tin: "29AWWPN7083L1ZB",
    shipping_mode: "Surface",
    address_type: "",
  };
}
