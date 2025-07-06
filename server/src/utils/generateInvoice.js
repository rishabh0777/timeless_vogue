import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Ensure the invoices folder exists
const invoiceDir = path.join("public", "invoices");
if (!fs.existsSync(invoiceDir)) {
  fs.mkdirSync(invoiceDir, { recursive: true });
}

export const generateInvoicePDF = ({ orderId, paymentId, address, cartItems, total }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });

    const filename = `invoice-${Date.now()}.pdf`;
    const filePath = path.join(invoiceDir, filename);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Header
    doc
      .fontSize(24)
      .fillColor("#333")
      .text("INVOICE", { align: "center" })
      .moveDown(1);

    doc
      .fontSize(12)
      .fillColor("#000")
      .text(`Order ID: ${orderId}`)
      .text(`Payment ID: ${paymentId}`)
      .text(`Date: ${new Date().toLocaleString()}`)
      .moveDown(1);

    // Address
    doc
      .fontSize(14)
      .fillColor("#000")
      .text("Shipping Address", { underline: true })
      .moveDown(0.5);

    doc
      .fontSize(12)
      .text(`${address.name}`)
      .text(`${address.addressLine}`)
      .text(`${address.city}, ${address.state} - ${address.pincode}`)
      .text(`${address.country}`)
      .text(`Phone: ${address.phone}`)
      .moveDown(1);

    // Cart Items Table Header
    doc
      .fontSize(14)
      .fillColor("#000")
      .text("Items", { underline: true })
      .moveDown(0.5);

    cartItems.forEach((item, index) => {
      const line = `${index + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`;
      doc.fontSize(12).text(line);
    });

    doc.moveDown(1);

    // Total
    doc
      .fontSize(14)
      .text(`Total Amount: ₹${total}`, { align: "right", bold: true });

    doc.end();

    writeStream.on("finish", () => resolve(filename));
    writeStream.on("error", reject);
  });
};
