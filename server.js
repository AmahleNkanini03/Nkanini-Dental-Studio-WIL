// server.js
require('dotenv').config();      // Load environment variables from .env
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());         // Allows JSON in POST requests

// Configure mail transporter (Mailtrap)
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,       // from .env
  port: process.env.MAILTRAP_PORT,       // from .env
  auth: {
    user: process.env.MAILTRAP_USER,     // from .env
    pass: process.env.MAILTRAP_PASS      // from .env
  }
});

// Endpoint to handle form submissions
app.post('/send-message', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const mailOptions = {
      from: `"${name}" <${email}>`, // the sender (user from your form)
      to: process.env.ADMIN_EMAIL,   // the admin who receives it
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Message:</strong><br>${message}</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

