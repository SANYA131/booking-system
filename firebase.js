const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_CONFIG_JSON)
  ),
});

const db = admin.firestore();
module.exports = db;
