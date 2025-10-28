// server.js - FIXED FOR COMMONJS
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Dental appointment backend is running!');
});

// Appointment route
app.post('/send-email', async (req, res) => {
  try {
    const { name, email, phone, service, date, time, message } = req.body;

    // Determine if it's an appointment or contact message
    const isAppointment = service || date || time;

    // Build email content
    let emailBody = `
      <h2>${isAppointment ? 'New Appointment Booking' : 'New Email'}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
    `;

    if (service) emailBody += `<p><strong>Service:</strong> ${service}</p>`;
    if (date)    emailBody += `<p><strong>Date:</strong> ${date}</p>`;
    if (time)    emailBody += `<p><strong>Time:</strong> ${time}</p>`;
    if (message) emailBody += `<p><strong>Message:</strong> ${message || '—'}</p>`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: isAppointment 
        ? `New Appointment – ${service || 'General'}` 
        : 'New Email from Contact Form',
      html: emailBody
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Send-email error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to send email'
    });
  }
});
// Serve your HTML, CSS, JS from parent folder
app.use(express.static('..'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

