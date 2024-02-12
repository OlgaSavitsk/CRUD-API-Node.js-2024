import App from "../app";
import { modulesRoutes } from "../modules";

const definedRoutes = (app: App) => {
  app.use('/api/users', modulesRoutes);
};

export default definedRoutes;
