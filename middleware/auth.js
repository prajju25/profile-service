const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from the header

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  try {
    // Verify the token using Google’s OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // You can perform additional checks here (e.g., check issuer, expiration)
    if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(403).json({ message: "Invalid audience" });
    }

    // Attach the payload (user info) to the request object
    req.user = payload;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
