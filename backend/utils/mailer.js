import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Brevo SMTP server
  port: 587,                    // TLS
  secure: false,                // use false for 587, true for 465
  auth: {
    user: process.env.BREVO_USER, // usually your Brevo account email
    pass: process.env.BREVO_API_KEY, // your Brevo SMTP key (generate from Brevo dashboard)
  },
});


export async function sendMail(to, subject, text) {
  try {
    await transporter.sendMail({
     from: `"Aravind" <aravindvu2006@gmail.com>`, // must match Brevo-verified sender
      to,
      subject,
      text,
    });
    return true;
    // console.log(`✅ Email sent to ${to}: ${subject}`);
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
  }
}
