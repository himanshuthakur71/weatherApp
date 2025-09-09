import nodemailer from 'nodemailer';
import { PUBLIC_GMAIL_USER, PUBLIC_GMAIL_PASS } from '$env/static/public'

export async function POST({ request }) {
  const { to, subject, text } = await request.json();

  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${PUBLIC_GMAIL_USER}`, // your Gmail email
        pass: `${PUBLIC_GMAIL_PASS}`, // your App Password
      },
    });



    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Weather App" <${PUBLIC_GMAIL_USER}>`, // sender address
      to: to, // recipient email
      subject: subject, // subject line
      // text: text, // plain text body
      html: text, // HTML body content
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (err:any) {
    return new Response(JSON.stringify({ error: 'Failed to send email', details: err.message }), { status: 500 });
  }
}
