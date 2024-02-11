import { Server, createServer } from "http";
import App from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const init = () => {
  const app = new App();
  // routes(app);
  return app;
};

const app = init();

(async () => {
  const server: Server = createServer(app.callback);
  server.listen(PORT, () => {
    console.log(`Server started ${process.pid}`);
  });
})();
