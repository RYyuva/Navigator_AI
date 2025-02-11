import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const FLASH_API = process.env.FLASH_API || "";

export { PORT, FLASH_API };
