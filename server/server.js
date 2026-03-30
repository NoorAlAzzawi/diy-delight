import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customItemsRoutes from "./routes/customItemsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DIY Delight API is running" });
});

app.use("/api/items", customItemsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
