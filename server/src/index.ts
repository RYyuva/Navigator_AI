import express from "express";
import { Express } from "express";
import error_handler from "./middlewares/ErrorHandler.js";
import credentials, { corsOptions, } from "./middlewares/CredentialMiddleware.js";
import cors from "cors";
import { PORT } from "./utils/config.js";
import cookie_parser from "cookie-parser";
import { gen_ai_route } from "./routes/index.js";

const app: Express = express();

app.use(credentials);
app.use(cookie_parser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", gen_ai_route);

app.get("/test", (_, res) => {
  res.send("YO KO SO !!!");
});

app.use(error_handler);

app.listen(PORT, () => {
  console.log(`Listening on port 🚀 : ${PORT}`);
});
