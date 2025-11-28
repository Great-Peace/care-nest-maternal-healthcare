import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'carenest.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    blood_type TEXT,
    preferred_hospital TEXT,
    language TEXT NOT NULL DEFAULT 'english',
    last_menstrual_period TEXT,
    pregnancy_week INTEGER,
    due_date TEXT,
    trimester TEXT,
    is_first_pregnancy TEXT,
    previous_pregnancies TEXT,
    previous_delivery_type TEXT,
    medical_conditions TEXT,
    allergies TEXT,
    current_medications TEXT,
    kin_name TEXT,
    kin_relationship TEXT,
    kin_phone TEXT,
    kin_address TEXT,
    emergency_contact TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ Database initialized successfully at:', dbPath);

export default db;
