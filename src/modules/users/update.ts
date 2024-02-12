import { findById, update } from "../../controllers/db.controller";
import { RouteControlService } from "services/route-control/route-control.service";
import { getData } from "../../utils/handleUser.utils";
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
    const userById = await findById(id);
    if (!userById) {
      ctx.res.statusCode = HTTP_STATUS.NOT_FOUND;
      ctx.body = JSON.stringify({ message: "User Not Found" });
    } else {
      const body = await getData(ctx.req);
      const { username, age, hobbies } = JSON.parse(body);
      const userData = {
        username: username || userById.username,
        age: age || userById.age,
        hobbies: hobbies || userById.hobbies,
      };

      const updatedUser = await update(id, userData);
      ctx.body = JSON.stringify(updatedUser);
      ctx.res.statusCode = HTTP_STATUS.OK;
      ctx.body = JSON.stringify(updatedUser);
    }
  } catch (error) {
    ctx.body = JSON.stringify({ message: "Server Error" });
    ctx.res.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}

export default (baseControl: RouteControlService) => {
  baseControl.use("PUT", handler);
};
