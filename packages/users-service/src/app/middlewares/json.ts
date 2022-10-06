import { HttpMiddleware, HttpRequest, HttpResponse, Middleware } from "../lib/http";

@Middleware()
class json implements HttpMiddleware {
  async execute(req: HttpRequest, res: HttpResponse): Promise<void> {
    res.setHeader("Content-Type", "application/json");
  }
}

export default json;