import { AppContext } from "models/user.model";
import { findById, remove } from "../../controllers/db.controller";
import { RouteControlService } from "services/route-control/route-control.service";
import { HTTP_STATUS } from "../../utils/constants";
import { validate } from "uuid";

async function handler(ctx: AppContext) {
  const id = ctx.req.url.split("/")[3];
  try {
    if (!validate(id)) {
      ctx.body = JSON.stringify({ message: "ID must be in uuid format" });
      ctx.res.statusCode = HTTP_STATUS.BAD_REQUEST;
    }
    const user = await findById(id);
    if (!user) {
      ctx.body = JSON.stringify({ message: "User Not Found" });
      ctx.res.statusCode = HTTP_STATUS.NOT_FOUND;
    } else {
      await remove(id);
      ctx.res.statusCode = HTTP_STATUS.OK;
      ctx.body = JSON.stringify({ message: `User ${id} removed` });
    }
  } catch (error) {
    ctx.body = JSON.stringify({ message: "Server Error" });
    ctx.res.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}

export default (baseControl: RouteControlService) => {
  baseControl.use("DELETE", handler);
};
