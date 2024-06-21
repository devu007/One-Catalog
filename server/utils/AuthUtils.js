const bcrypt = require("bcryptjs");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUND) || 10;

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function encryptPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
}

async function checkPassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error checking password:", error);
    throw error;
  }
}

module.exports = { isValidEmail, encryptPassword, checkPassword };
