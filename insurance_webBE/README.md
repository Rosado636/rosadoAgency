# Rosado Agency Insurance Backend - PostgreSQL

A Node.js backend API for the Rosado Agency insurance broker website, now powered by PostgreSQL for production deployment.

## 🚀 Features

- **PostgreSQL Database**: Production-ready database with connection pooling
- **RESTful API**: Complete CRUD operations for appointment management
- **Email Integration**: Nodemailer for appointment reminders
- **Validation**: Input validation for email and phone formats
- **Scheduled Tasks**: Cron jobs for automated daily reminders
- **Vercel Ready**: Configured for seamless Vercel deployment

## 📋 API Endpoints

### Appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get specific appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `PUT /api/appointments/:id/schedule` - Schedule appointment with date/time

### Reminders
- `POST /api/reminders/send/:id` - Send reminder for appointment
- `POST /api/reminders/daily` - Send daily reminders
- `POST /api/reminders/test/:id` - Test reminder functionality

### Health Check
- `GET /api/health` - Server health status

## 🛠 Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or Vercel Postgres)

### Installation
```bash
npm install
```

### Environment Variables
Create `.env` file:
```bash
DATABASE_URL=postgresql://username:password@hostname:port/database
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=5000
NODE_ENV=production
```

### Database Setup
```bash
# Run migration script
psql -d your_database -f migrate.sql
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 🗄 Database Schema

### Appointments Table
```sql
CREATE TABLE appointments (
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
);
```

## 🚀 Vercel Deployment

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables** in Vercel dashboard:
   - `DATABASE_URL` - Your Vercel Postgres connection string
   - `EMAIL_USER` - Gmail address for sending emails
   - `EMAIL_PASSWORD` - Gmail app password
   - `NODE_ENV=production`

3. **Set up Vercel Postgres**
   - Create database in Vercel dashboard
   - Run migration script in database console

## 📝 API Usage Examples

### Create Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "5551234567",
    "email": "john@example.com",
    "reason": "Life insurance consultation"
  }'
```

### Get All Appointments
```bash
curl http://localhost:5000/api/appointments
```

### Update Appointment
```bash
curl -X PUT http://localhost:5000/api/appointments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed",
    "appointment_date": "2025-09-30T10:00:00Z",
    "zoom_link": "https://zoom.us/j/123456789"
  }'
```

## 🔒 Security Features

- **SQL Injection Protection**: Parameterized queries
- **Input Validation**: Email and phone format validation
- **CORS Configuration**: Proper cross-origin settings
- **Environment Variables**: Secure credential management
- **SSL Support**: Production database connections

## 📊 Performance Features

- **Connection Pooling**: Efficient database connections
- **Async/Await**: Non-blocking operations
- **Indexes**: Optimized database queries
- **Error Handling**: Proper HTTP status codes
- **Graceful Shutdown**: Clean resource cleanup

## 🧪 Testing

The backend has been thoroughly tested with PostgreSQL:
- ✅ All CRUD operations working
- ✅ Data validation functioning
- ✅ Reminder system operational
- ✅ Error handling verified
- ✅ Performance optimized

## 📞 Contact Information

- **Business**: Rosado Agency
- **Phone**: (254) 548-4815
- **Email**: machellerosado@gmail.com
- **Service Area**: Texas

## 📄 License

This project is proprietary and confidential. All rights reserved.
