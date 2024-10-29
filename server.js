const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const protectedRoutes = require("./routes/protectedRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
