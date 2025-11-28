import db from '../src/services/database';

console.log('\n📊 CareNest Database Viewer\n');
console.log('=' .repeat(80));

// Get all users
const users = db.prepare('SELECT * FROM users').all();

if (users.length === 0) {
  console.log('\n❌ No users found in database\n');
} else {
  console.log(`\n✅ Found ${users.length} user(s):\n`);

  users.forEach((user: any, index: number) => {
    console.log(`\n👤 User ${index + 1}:`);
    console.log('-'.repeat(80));
    console.log(`ID:              ${user.id}`);
    console.log(`Name:            ${user.full_name}`);
    console.log(`Phone:           ${user.phone_number}`);
    console.log(`Date of Birth:   ${user.date_of_birth}`);
    console.log(`Blood Type:      ${user.blood_type || 'N/A'}`);
    console.log(`Hospital:        ${user.preferred_hospital || 'N/A'}`);
    console.log(`Language:        ${user.language}`);
    console.log(`\n🤰 Pregnancy Info:`);
    console.log(`  Week:          ${user.pregnancy_week || 'N/A'}`);
    console.log(`  Due Date:      ${user.due_date || 'N/A'}`);
    console.log(`  Trimester:     ${user.trimester || 'N/A'}`);
    console.log(`  First Pregnancy: ${user.is_first_pregnancy || 'N/A'}`);
    console.log(`\n🏥 Medical Info:`);
    console.log(`  Conditions:    ${user.medical_conditions || '[]'}`);
    console.log(`  Allergies:     ${user.allergies || 'N/A'}`);
    console.log(`  Medications:   ${user.current_medications || 'N/A'}`);
    console.log(`\n📞 Emergency Contact:`);
    console.log(`  Name:          ${user.kin_name || 'N/A'}`);
    console.log(`  Relationship:  ${user.kin_relationship || 'N/A'}`);
    console.log(`  Phone:         ${user.kin_phone || 'N/A'}`);
    console.log(`  Address:       ${user.kin_address || 'N/A'}`);
    console.log(`\n📅 Timestamps:`);
    console.log(`  Created:       ${user.created_at}`);
    console.log(`  Updated:       ${user.updated_at}`);
    console.log('-'.repeat(80));
  });
}

console.log('\n' + '='.repeat(80) + '\n');

// Close database connection
db.close();
