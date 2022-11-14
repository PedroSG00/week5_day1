// app.js
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
console.log(`Salt => ${salt}`);


const plainPassword1 = 'superPopino';

// Create hash
const hash1 = bcrypt.hashSync(plainPassword1, salt);


console.log(`Hash 1: ${hash1}`);


// Verify hash
const verifyPass1 = bcrypt.compareSync(plainPassword1, hash1);
console.log(`Is plainPassword1 corresponding to the created hash1: ${verifyPass1}`);
