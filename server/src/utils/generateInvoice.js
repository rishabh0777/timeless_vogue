// utils/generateInvoice.js
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoicePDF = ({ orderId, paymentId, address, cartItems, total }) => {
  const doc = new PDFDocument();

  const filename = `invoice-${Date.now()}.pdf`;
  const filePath = path.join("invoices", filename);

  // Ensure invoices directory exists
  if (!fs.existsSync("invoices")) {
    fs.mkdirSync("invoices");
  }

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(22).text("INVOICE", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Order ID: ${orderId}`);
  doc.text(`Payment ID: ${paymentId}`);
  doc.text(`Date: ${new Date().toLocaleString()}`);

  doc.moveDown().fontSize(16).text("Shipping Address:");
  doc.fontSize(12).text(`${address.name}, ${address.addressLine}`);
  doc.text(`${address.city}, ${address.state} - ${address.pincode}, ${address.country}`);
  doc.text(`Phone: ${address.phone}`);

  doc.moveDown().fontSize(16).text("Items:");
  cartItems.forEach((item, index) => {
    doc.fontSize(12).text(`${index + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`);
  });

  doc.moveDown().fontSize(14).text(`Total: ₹${total}`, { align: "right" });

  doc.end();

  return filePath;
};
