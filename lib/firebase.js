const admin = require("firebase-admin");

const type = process.env.FIREBASE_TYPE;
const project_id = process.env.FIREBASE_PROJECT_ID;
const private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID;
const private_key = process.env.FIREBASE_PRIVATE_KEY;
const client_email = process.env.FIREBASE_CLIENT_EMAIL;
const client_id = process.env.FIREBASE_CLIENT_ID;
const auth_uri = process.env.FIREBASE_AUTH_URI;
const token_uri = process.env.FIREBASE_TOKEN_URI;
const auth_provider_x509_cert_url =
  process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL;
const client_x509_cert_url = process.env.FIREBASE_CLIENT_X509_CERT_URL;
const databaseURL = process.env.FIREBASE_DATABASE_URL;

const JSON = {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON),
    databaseURL: databaseURL,
  });
}

export const firebaseDB = admin.database();
