import { IncomingMessage, ServerResponse } from "http";
import { AppContext } from "models/user.model";
import { Stream } from "stream";

class App {
  context: AppContext;
  middleware: Map<string, (ctx: AppContext) => Promise<void>>;
  constructor() {
    this.context = Object.create({});
    this.middleware = new Map();
  }

  use(url: string, fn: (ctx: AppContext) => Promise<void>) {
    this.middleware.set(url, fn);
    return this;
  }

  callback(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const fn = this.middleware;
    const ctx = this.createContext(req, res);
    return this.handleRequest(ctx, fn);
  }

  async handleRequest(
    ctx: AppContext,
    fnMiddleware: Map<string, (ctx: AppContext) => Promise<void>>
  ) {
    const handleResponse = () => this.respond(ctx);
    const fn = fnMiddleware.get(ctx.path);
    try {
      await fn(ctx).then(handleResponse);
    } catch (err) {
      console.error(err);
    }
  }

  createContext(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const context = Object.create({});
    context.req = req;
    context.res = res;
    context.path = "/api/" + req.url.split("/")[2];
    context.method = req.method;
    return context;
  }

  respond(ctx: AppContext) {
    const res = ctx.res;
    let body = ctx.body;
    if (Buffer.isBuffer(body)) return res.end(body);
    if (typeof body === "string") return res.end(body);
    if (body instanceof Stream) return body.pipe(res);
    body = JSON.stringify(body);
    console.log(body, ctx.status)
    res.end(body);
  }
}

export default App;
