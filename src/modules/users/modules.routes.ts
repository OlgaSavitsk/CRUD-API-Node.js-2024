import getRoutes from "../../utils/routes.utils";
import getFn from "./get";
import createFn from "./create";
import updateFn from "./update";
import deleteFn from "./delete";
import getUserFn from "./getById";
import { AppContext } from "models/user.model";

const modulesRoutes = (ctx: AppContext) => {
  return getRoutes([getFn, createFn, updateFn, deleteFn, getUserFn], ctx);
};

export default modulesRoutes;
