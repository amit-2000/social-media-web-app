const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

 const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

const devlopement = {
  name: "development",
  // assests path.
  asset_path: "./assets",
  // session cookie key.
  session_cookie_key: "blahsomething",
  // database name:
  db: "social-media-app",
  // nodemailer obj
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "alchemy.cn18",
      pass: "codingninjas",
    },
  },
  // google auth id and  more.
  google_client_id:
    "578244236244-rm1ihpsvhm9adju20jg470rgpi87r49l.apps.googleusercontent.com",
  google_client_Secret: "CL1yCkaTlUj3JsZ5HnWXbe3J",
  google_callback_URL: "http://localhost:8000/users/auth/google/callback",
  // JWT secret key.
  jwt_secret_key: "codeial",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSETS_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL_CLIENT_ID,
  google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_callback_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret_key: process.env.CODEIAL_JWT_SECRET_KEY,
  //morgan
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};
console.log("client id is", process.env.CODEIAL_CLIENT_ID);

module.exports =
  eval(process.env.CODEIAL_ENVIRONMENT) == undefined
    ? devlopement
    : eval(process.env.CODEIAL_ENVIRONMENT);
