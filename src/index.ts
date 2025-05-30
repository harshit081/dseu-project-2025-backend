import { config } from "dotenv";

config();

import app from "./app";
import "./db";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
