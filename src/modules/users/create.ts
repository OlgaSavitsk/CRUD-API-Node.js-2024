import { getData } from "../../utils/handleUser.utils";
import { create } from "../../controllers/db.controller";
import { RouteControlService } from "services/route-control/route-control.service";
import { AppContext } from "models/user.model";
import { HTTP_STATUS } from "../../utils/constants";

async function handler(ctx: AppContext) {
  try {
    const body = await getData(ctx.req);
    const { username, age, hobbies } = JSON.parse(body);
    const user = {
      username: username,
      age: age,
      hobbies: hobbies,
    };
    if (Object.values(user).some((val) => val === undefined)) {
      ctx.body = JSON.stringify({ message: "All fields must be filled" });
      ctx.res.statusCode = HTTP_STATUS.BAD_REQUEST;
    } else {
      const newUser = await create(user);
      ctx.body = JSON.stringify(newUser);
      ctx.res.statusCode = HTTP_STATUS.CREATE;
    }
  } catch (error) {
    ctx.body = JSON.stringify({ message: "Server Error" });
    ctx.res.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}

export default (baseControl: RouteControlService) => {
  baseControl.use("POST", handler);
};
