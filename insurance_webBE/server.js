const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create appointments table
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        reason TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        appointment_date TIMESTAMP,
        zoom_link TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reminder_sent BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Initialize database on startup
initializeDatabase();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Validation functions
const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

const validatePhone = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length === 10;
};

// Routes

// Create appointment
app.post('/api/appointments', async (req, res) => {
  const { name, phone, email, reason } = req.body;

  // Validate required fields
  if (!name || !phone || !email || !reason) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate phone format
  if (!validatePhone(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format. Please use a 10-digit US phone number.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO appointments (name, phone, email, reason)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, phone, email, reason, status`,
      [name.trim(), phone.trim(), email.trim().toLowerCase(), reason.trim()]
    );

    res.status(201).json({
      message: 'Appointment request submitted successfully',
      appointment: result.rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM appointments ORDER BY created_at DESC');
    res.json({ appointments: result.rows });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while fetching appointments' });
  }
});

// Get single appointment
app.get('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM appointments WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ appointment: result.rows[0] });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while fetching the appointment' });
  }
});

// Update appointment
app.put('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { status, appointment_date, zoom_link, reminder_sent } = req.body;

  let updateFields = [];
  let updateValues = [];
  let paramCount = 1;

  if (status) {
    updateFields.push(`status = $${paramCount++}`);
    updateValues.push(status);
  }

  if (appointment_date) {
    updateFields.push(`appointment_date = $${paramCount++}`);
    updateValues.push(appointment_date);
  }

  if (zoom_link) {
    updateFields.push(`zoom_link = $${paramCount++}`);
    updateValues.push(zoom_link);
  }

  if (reminder_sent !== undefined) {
    updateFields.push(`reminder_sent = $${paramCount++}`);
    updateValues.push(reminder_sent);
  }

  updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
  updateValues.push(id);

  const sql = `UPDATE appointments SET ${updateFields.join(', ')} WHERE id = $${paramCount}`;

  try {
    const result = await pool.query(sql, updateValues);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while updating the appointment' });
  }
});

// Delete appointment
app.delete('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment' });
  }
});

// Reminder functions
const sendEmailReminder = async (appointment) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: appointment.email,
      subject: 'Appointment Reminder - Rosado Agency',
      html: `
        <h2>Appointment Reminder</h2>
        <p>Dear ${appointment.name},</p>
        <p>This is a friendly reminder about your appointment scheduled for today.</p>
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Date & Time:</strong> ${appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleString() : 'To be scheduled'}</li>
          <li><strong>Reason:</strong> ${appointment.reason}</li>
          <li><strong>Zoom Link:</strong> ${appointment.zoom_link || 'Will be provided before the meeting'}</li>
        </ul>
        <p>If you need to reschedule or have any questions, please contact us at (254) 548-4815.</p>
        <p>We look forward to speaking with you!</p>
        <p>Best regards,<br>Rosado Agency Team</p>
      `
    };

    // For demo purposes, we'll just log the email instead of actually sending it
    console.log(`Email reminder would be sent to ${appointment.email}:`, mailOptions.subject);
    return true;
  } catch (error) {
    console.error('Failed to send email reminder:', error);
    return false;
  }
};

const sendSMSReminder = async (appointment) => {
  try {
    // Clean phone number
    let phone = appointment.phone.replace(/\D/g, '');
    if (phone.length === 10) {
      phone = `+1${phone}`;
    }

    let message = `Reminder: You have an appointment today with Rosado Agency. `;
    if (appointment.appointment_date) {
      message += `Time: ${new Date(appointment.appointment_date).toLocaleTimeString()}. `;
    }
    if (appointment.zoom_link) {
      message += `Zoom: ${appointment.zoom_link}`;
    } else {
      message += "We'll contact you to confirm the time.";
    }

    // For demo purposes, we'll just log the SMS instead of actually sending it
    console.log(`SMS reminder would be sent to ${phone}: ${message}`);
    return true;
  } catch (error) {
    console.error('Failed to send SMS reminder:', error);
    return false;
  }
};

// Send reminder for specific appointment
app.post('/api/reminders/send/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM appointments WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const appointment = result.rows[0];

    if (appointment.reminder_sent) {
      return res.status(400).json({ error: 'Reminder already sent' });
    }

    const emailSent = await sendEmailReminder(appointment);
    const smsSent = await sendSMSReminder(appointment);

    if (emailSent || smsSent) {
      await pool.query(
        'UPDATE appointments SET reminder_sent = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [id]
      );

      res.json({
        message: 'Reminders sent successfully',
        details: `Email: ${emailSent}, SMS: ${smsSent}`
      });
    } else {
      res.status(500).json({ error: 'Failed to send reminders' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Test reminder endpoint
app.post('/api/reminders/test/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM appointments WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const appointment = result.rows[0];

    res.json({
      message: 'Test reminder simulation completed',
      appointment: {
        id: appointment.id,
        name: appointment.name,
        email: appointment.email,
        phone: appointment.phone,
        appointment_date: appointment.appointment_date,
        zoom_link: appointment.zoom_link
      },
      email_simulation: `Email would be sent to: ${appointment.email}`,
      sms_simulation: `SMS would be sent to: ${appointment.phone}`
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Send daily reminders
app.post('/api/reminders/daily', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  try {
    const result = await pool.query(`
      SELECT * FROM appointments 
      WHERE DATE(appointment_date) = $1 
      AND reminder_sent = FALSE 
      AND status = 'confirmed'
    `, [today]);

    const results = [];
    for (const appointment of result.rows) {
      const emailSent = await sendEmailReminder(appointment);
      const smsSent = await sendSMSReminder(appointment);

      if (emailSent || smsSent) {
        await pool.query(
          'UPDATE appointments SET reminder_sent = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
          [appointment.id]
        );
      }

      results.push({
        appointment_id: appointment.id,
        name: appointment.name,
        success: emailSent || smsSent,
        message: `Email: ${emailSent}, SMS: ${smsSent}`
      });
    }

    const successful = results.filter(r => r.success).length;
    res.json({
      message: `Daily reminders processed: ${successful}/${results.length} successful`,
      results
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Schedule appointment
app.put('/api/appointments/:id/schedule', async (req, res) => {
  const { id } = req.params;
  const { appointment_date, zoom_link, status } = req.body;

  let updateFields = [];
  let updateValues = [];
  let paramCount = 1;

  if (appointment_date) {
    updateFields.push(`appointment_date = $${paramCount++}`);
    updateValues.push(appointment_date);
  }

  if (zoom_link) {
    updateFields.push(`zoom_link = $${paramCount++}`);
    updateValues.push(zoom_link);
  }

  if (status) {
    updateFields.push(`status = $${paramCount++}`);
    updateValues.push(status);
  }

  updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
  updateValues.push(id);

  const sql = `UPDATE appointments SET ${updateFields.join(', ')} WHERE id = $${paramCount}`;

  try {
    const result = await pool.query(sql, updateValues);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while scheduling the appointment' });
  }
});

// Schedule daily reminder cron job (runs every day at 9 AM)
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily reminder job...');
  try {
    const response = await fetch('http://localhost:' + PORT + '/api/reminders/daily', {
      method: 'POST'
    });
    const result = await response.json();
    console.log('Daily reminders result:', result);
  } catch (error) {
    console.error('Error running daily reminders:', error);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Rosado Agency Insurance Broker API is running',
    database: 'PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log('Database: PostgreSQL');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  try {
    await pool.end();
    console.log('Database connection pool closed.');
  } catch (error) {
    console.error('Error closing database pool:', error);
  }
  process.exit(0);
});
