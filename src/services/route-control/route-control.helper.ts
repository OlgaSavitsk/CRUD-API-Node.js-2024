import { AppContext } from "models/user.model";

const getParam = (ctx: AppContext) => {
  return ctx.req.url?.match(/\/users\/([0-9a-z]+)/) && ctx.method === "GET"
    ? "GET/:id"
    : ctx.method;
};

export default getParam;
