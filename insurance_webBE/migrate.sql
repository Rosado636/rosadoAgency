-- PostgreSQL Migration Script for Rosado Agency Insurance Broker
-- This script creates the appointments table with all necessary fields

-- Drop table if exists (for fresh migration)
-- DROP TABLE IF EXISTS appointments;

-- Create appointments table
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
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at);

-- Add constraints
ALTER TABLE appointments 
ADD CONSTRAINT chk_status 
CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'));

-- Insert sample data (optional - remove in production)
-- INSERT INTO appointments (name, phone, email, reason) VALUES
-- ('John Doe', '5551234567', 'john.doe@example.com', 'Life insurance consultation'),
-- ('Jane Smith', '5559876543', 'jane.smith@example.com', 'Mortgage protection inquiry');

-- Verify table creation
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'appointments' 
ORDER BY ordinal_position;
