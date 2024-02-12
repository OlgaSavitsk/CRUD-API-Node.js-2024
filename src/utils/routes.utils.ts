import { AppContext } from "models/user.model";
import { RouteControlService } from "../services/route-control/route-control.service";

const getRoutes = (routesFunctions: any[], ctx: AppContext) => {
  const base = new RouteControlService(ctx);
  routesFunctions.forEach((func) => {
    func(base);
  });
  return base.init();
};

export default getRoutes;
