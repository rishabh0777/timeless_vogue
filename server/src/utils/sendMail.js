import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
})

const sendEmail = async (to,subject,html)=>{

   
    const options = {
      from:`timeless vogue <timelessvogue202@gmail.com>`,
      to,
      subject,
      html
    }

    const info = transporter.sendMail(options);
    return info;
}

export default sendEmail;