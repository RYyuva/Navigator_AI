import express from "express";
import { get_location } from "../controllers/gen_ai_controller/index.js";
import async_middleware from "../middlewares/AsyncMiddleware.js";

const route = express.Router();

route.post("/get-location", async_middleware(get_location));

export default route;
