class App {
  context: any;
  middleware: never[];
  constructor() {
    this.context = Object.create({});
    this.middleware = [];
  }

  use(fn: never) {
    this.middleware.push(fn);
    return this;
  }

  callback() {
    const fn = this.middleware;
    this.handleContext(this.context, fn);
  }

  handleContext(ctx: any, fn: any[]) {
    return fn.forEach((element: (arg0: any) => void) => {
      element(ctx);
    });
  }
}

export default App
