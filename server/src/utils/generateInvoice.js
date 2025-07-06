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
    const doc = new PDFDocument({ margin: 50 });

    const filename = `invoice-${Date.now()}.pdf`;
    const filePath = path.join(invoiceDir, filename);
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Header Section
    doc
      .fontSize(26)
      .fillColor("#1a1a1a")
      .text("Timeless Vogue", { align: "center", underline: true })
      .moveDown(0.3);

    doc
      .fontSize(14)
      .fillColor("#555")
      .text("Thank you for shopping with us!", { align: "center" })
      .moveDown(1.5);

    // Invoice Title
    doc
      .fontSize(22)
      .fillColor("#000000")
      .text("INVOICE", { align: "center" })
      .moveDown(1);

    // Invoice Info
    doc
      .fontSize(12)
      .fillColor("#000")
      .text(`Order ID: ${orderId}`)
      .text(`Payment ID: ${paymentId}`)
      .text(`Date: ${new Date().toLocaleString()}`)
      .moveDown(1);

    // Shipping Address
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

    // Cart Items Table
    doc
      .fontSize(14)
      .fillColor("#000")
      .text("Order Summary", { underline: true })
      .moveDown(0.5);

    cartItems.forEach((item, index) => {
      const line = `${index + 1}. ${item.name}  × ${item.quantity}  = ₹${item.price * item.quantity}`;
      doc.fontSize(12).text(line);
    });

    doc.moveDown(1);

    // Total
    doc
      .fontSize(14)
      .fillColor("#000")
      .text(`Total Amount: ₹${total}`, { align: "right", bold: true })
      .moveDown(2);

    // Footer Message
    doc
      .fontSize(12)
      .fillColor("#333")
      .text("We hope to see you again soon!", { align: "center" })
      .text("— Team Timeless Vogue", { align: "center", italic: true });

    doc.end();

    writeStream.on("finish", () => resolve(filename));
    writeStream.on("error", reject);
  });
};
