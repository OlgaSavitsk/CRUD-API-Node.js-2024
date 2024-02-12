import { Server, createServer } from "http";
import App from "./app";
import routes from "./routes/index";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const init = () => {
  const app = new App();
  routes(app);
  return app;
};

const app = init();

(async () => {
  const server: Server = createServer((req, res) => {
    // res.writeHead(404, { "Content-Type": "application/json" });
    app.callback(req, res)
  });
  server.listen(PORT, () => {
    console.log(`Server started ${PORT}`);
  });
})();
