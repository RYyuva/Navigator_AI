import express from "express";
import { get_locaiton } from "../controllers/gen_ai_controller/index.js";
import async_middleware from "../middlewares/AsyncMiddleware.js";

const route = express.Router();

route.get("/get-location", async_middleware(get_locaiton));

export default route;
