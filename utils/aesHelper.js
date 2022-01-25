const crypto = require('crypto');

const ENC_KEY = "b409c67ecdc21971a7a73c59de1bfd0f"; // set random encryption key
const IV = "7f160efc2ea784d3"; // set random initialisation vector
// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');

exports.encrypt = (text) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENC_KEY), Buffer.from(IV));
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

exports.decrypt = (encrypted) => {
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENC_KEY), Buffer.from(IV));
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
};