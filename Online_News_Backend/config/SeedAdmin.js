// utils/seedAdmin.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.warn('⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env — skipping admin seed');
            return;
        }

        const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
        if (existingAdmin) {
            console.log('✔ Admin already exists');
            return;
        }

        const hashed = await bcrypt.hash(adminPassword, 10);

        await User.create({
            name: 'Admin User',
            email: adminEmail.toLowerCase(),
            password: hashed,
            role: 'admin',
        });

        console.log('🎉 Admin created successfully!');
    } catch (error) {
        console.error('❌ Error creating admin:', error);
    }
};

module.exports = seedAdmin;
