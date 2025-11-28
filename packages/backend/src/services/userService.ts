import { UserData } from '../types';
import db from './database';

export class UserService {
  static async createUser(userData: UserData): Promise<UserData> {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 9);
    const id = `user_${timestamp}_${randomStr}`;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO users (
        id, full_name, date_of_birth, phone_number, blood_type,
        preferred_hospital, language, last_menstrual_period, pregnancy_week,
        due_date, trimester, is_first_pregnancy, previous_pregnancies,
        previous_delivery_type, medical_conditions, allergies,
        current_medications, kin_name, kin_relationship, kin_phone,
        kin_address, emergency_contact, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);

    stmt.run(
      id,
      userData.fullName,
      userData.dateOfBirth,
      userData.phoneNumber,
      userData.bloodType || null,
      userData.preferredHospital || null,
      userData.language || 'english',
      userData.lastMenstrualPeriod || null,
      userData.pregnancyWeek || null,
      userData.dueDate || null,
      userData.trimester || null,
      userData.isFirstPregnancy || null,
      userData.previousPregnancies || null,
      userData.previousDeliveryType || null,
      JSON.stringify(userData.medicalConditions || []),
      userData.allergies || null,
      userData.currentMedications || null,
      userData.kinName || null,
      userData.kinRelationship || null,
      userData.kinPhone || null,
      userData.kinAddress || null,
      userData.emergencyContact || null,
      now,
      now
    );

    return this.getUserById(id) as Promise<UserData>;
  }

  static async getUserById(id: string): Promise<UserData | null> {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const row: any = stmt.get(id);

    if (!row) return null;
    return this.mapRowToUser(row);
  }

  static async getUserByPhone(phoneNumber: string): Promise<UserData | null> {
    const stmt = db.prepare('SELECT * FROM users WHERE phone_number = ?');
    const row: any = stmt.get(phoneNumber);

    if (!row) return null;
    return this.mapRowToUser(row);
  }

  static async updateUser(id: string, updates: Partial<UserData>): Promise<UserData | null> {
    const user = await this.getUserById(id);
    if (!user) return null;

    const fields: string[] = [];
    const values: any[] = [];

    if (updates.fullName !== undefined) {
      fields.push('full_name = ?');
      values.push(updates.fullName);
    }
    if (updates.dateOfBirth !== undefined) {
      fields.push('date_of_birth = ?');
      values.push(updates.dateOfBirth);
    }
    if (updates.bloodType !== undefined) {
      fields.push('blood_type = ?');
      values.push(updates.bloodType);
    }
    if (updates.preferredHospital !== undefined) {
      fields.push('preferred_hospital = ?');
      values.push(updates.preferredHospital);
    }
    if (updates.pregnancyWeek !== undefined) {
      fields.push('pregnancy_week = ?');
      values.push(updates.pregnancyWeek);
    }
    if (updates.dueDate !== undefined) {
      fields.push('due_date = ?');
      values.push(updates.dueDate);
    }
    if (updates.trimester !== undefined) {
      fields.push('trimester = ?');
      values.push(updates.trimester);
    }

    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(id);

    const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return this.getUserById(id);
  }

  static async deleteUser(id: string): Promise<boolean> {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static getAllUsers(): UserData[] {
    const stmt = db.prepare('SELECT * FROM users');
    const rows: any[] = stmt.all();
    return rows.map(row => this.mapRowToUser(row));
  }

  private static mapRowToUser(row: any): UserData {
    return {
      id: row.id,
      fullName: row.full_name,
      dateOfBirth: row.date_of_birth,
      phoneNumber: row.phone_number,
      bloodType: row.blood_type,
      preferredHospital: row.preferred_hospital,
      language: row.language as 'english' | 'kinyarwanda' | 'french',
      lastMenstrualPeriod: row.last_menstrual_period,
      pregnancyWeek: row.pregnancy_week,
      dueDate: row.due_date,
      trimester: row.trimester,
      isFirstPregnancy: row.is_first_pregnancy,
      previousPregnancies: row.previous_pregnancies,
      previousDeliveryType: row.previous_delivery_type,
      medicalConditions: row.medical_conditions ? JSON.parse(row.medical_conditions) : [],
      allergies: row.allergies,
      currentMedications: row.current_medications,
      kinName: row.kin_name,
      kinRelationship: row.kin_relationship,
      kinPhone: row.kin_phone,
      kinAddress: row.kin_address,
      emergencyContact: row.emergency_contact,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
