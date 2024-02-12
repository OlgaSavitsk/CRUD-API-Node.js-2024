import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";
import path from "path";
import { findAll } from "../../controllers/db.controller";
import { RouteControlService } from "services/route-control/route-control.service";
import { AppContext } from "models/user.model";
import { HTTP_STATUS } from "../../utils/constants";

async function handler(ctx: AppContext) {
  try {
    const users = await findAll();
    ctx.res.statusCode = HTTP_STATUS.OK;
    ctx.body = JSON.stringify(users);
  } catch (error) {
    ctx.body = JSON.stringify({ message: "Server Error" });
    ctx.res.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}

export default (baseControl: RouteControlService) => {
  baseControl.use("GET", handler);
};
