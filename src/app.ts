import express from "express";
import stateRouter from "./routes/state.routes.js";
import cityRouter from "./routes/city.routes.js";

const app = express();

app.use(express.json());
app.use(stateRouter);
app.use(cityRouter);

app.get("/", (req, res) => {
  res.json({
    message: "API local rodando",
  });
});

export default app;
