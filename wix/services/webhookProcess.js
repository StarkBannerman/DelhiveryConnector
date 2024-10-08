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

  // console.log(`Shipping : ${priceSummary.shipping.amount}`);
  const packageDetailsResult = packageDetails();
  const calculateCODPrice = () => {
    return parseFloat(priceSummary.shipping.amount) == 0
      ? parseFloat(priceSummary.total.amount) + 20
      : parseFloat(priceSummary.total.amount);
  };

  // console.log(parseFloat(priceSummary.shipping.amount));
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

  const formatPhoneNumber = (phone) => {
    return phone ? phone.replace(/\D/g, "") : "";
  };

  return {
    name: `${contactDetails.firstName} ${contactDetails.lastName}`,
    add: address?.addressLine2
      ? `${address?.addressLine},${address?.addressLine2}`
      : address?.addressLine,
    pin: address?.postalCode,
    city: address?.city,
    state: address?.subdivisionFullname,
    country: address?.countryFullname,
    phone: formatPhoneNumber(contactDetails?.phone),
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
    cod_amount: paymentStatus === "PAID" ? "" : calculateCODPrice(),
    order_date: new Date(createdDate).toLocaleDateString(),
    total_amount:
      paymentStatus === "PAID"
        ? parseFloat(priceSummary.total.amount)
        : calculateCODPrice(),
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
