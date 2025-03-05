const crypto = require('crypto');

const message = 'Hello, world!';
const signature = '3045022100b8d0c0d9...'; // the signature to verify
const publicKey = '-----BEGIN PUBLIC KEY-----\nMIIBIjAN...'; // the public key

// Create a verifier object
const verifier = crypto.createVerify('SHA256');

// Add the data to be verified
verifier.update(message);

// Verify the signature
const isVerified = verifier.verify(publicKey, signature, 'base64');

console.log('Signature verified:', isVerified);