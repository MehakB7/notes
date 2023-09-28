// issue and verify jwt token

const fs = require("fs");
const jwt = require("jsonwebtoken");

const issueJwt = () => {
  const privateKey = fs.readFileSync(__dirname + "/_private.pem", "utf-8");
  if (privateKey) {
    const payload = {
      name: process.argv[2],
      email: process.argv[3],
    };

    const options = {
      algorithm: "RS256",
    };

    const signed = jwt.sign(payload, privateKey, options);

    console.log("jwt token is", signed);
    return signed;
  }
};

const verfifyJwt = (token) => {
  const publicKey = fs.readFileSync(__dirname + "/_public.pem");
  const ans = jwt.verify(token, publicKey);
  console.log("ans is", ans);
};
const token = issueJwt();

verfifyJwt(token);
