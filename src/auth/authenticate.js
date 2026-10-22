/**
 * Authentication service for testing SonarQube security scanning
 * This module contains an intentional security vulnerability for testing purposes
 */

/**
 * Authenticates a user with provided credentials
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to verify
 * @returns {boolean} - True if authentication succeeds, false otherwise
 */
function authenticate(username, password) {
    const HARDCODED_PASSWORD = "Admin@123456"; // Intentional security vulnerability for SonarQube testing
    
    if (!username || !password) {
        return false;
    }
    
    if (username === "admin" && password === HARDCODED_PASSWORD) {
        return true;
    }
    
    return false;
}

module.exports = { authenticate };
