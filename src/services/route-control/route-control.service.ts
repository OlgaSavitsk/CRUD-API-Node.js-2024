import { AppContext } from "models/user.model";
import getParam from "./route-control.helper";

export class RouteControlService {
  ctx: AppContext;
  middleware: Map<string, (ctx: AppContext) => Promise<void>>;
  constructor(ctx: AppContext) {
    this.ctx = ctx;
    this.middleware = new Map();
  }

  use(command: string, fn: (ctx: AppContext) => Promise<void>) {
    this.middleware.set(command, fn);
    return this;
  }

  async init() {
    const param = getParam(this.ctx)
    const fn = this.middleware.get(param);
    try {
      return await fn(this.ctx);
    } catch (err) {
      console.error(err);
    }
  }
}
