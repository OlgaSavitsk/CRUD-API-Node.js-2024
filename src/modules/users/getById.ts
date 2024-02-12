import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";
import path from "path";
import { findAll, findById } from "../../controllers/db.controller";
import { RouteControlService } from "services/route-control/route-control.service";
import { validate } from "uuid";
import { AppContext } from "models/user.model";
import { HTTP_STATUS } from "../../utils/constants";

async function handler(ctx: AppContext) {
  const id = ctx.req.url.split("/")[3];
  try {
    if (!validate(id)) {
      ctx.res.statusCode = HTTP_STATUS.BAD_REQUEST;
      ctx.body = JSON.stringify({ message: "ID must be in uuid format" });
    }
    const user = await findById(id);

    if (!user) {
      ctx.body = JSON.stringify({ message: "User Not Found" });
      ctx.res.statusCode = HTTP_STATUS.NOT_FOUND;
    } else {
      ctx.body = JSON.stringify(user);
      ctx.res.statusCode = HTTP_STATUS.OK;
    }
  } catch (error) {
    ctx.body = JSON.stringify({ message: "Server Error" });
    ctx.res.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}

export default (baseControl: RouteControlService) => {
  baseControl.use("GET/:id", handler);
};
