import { IncomingMessage, ServerResponse } from "http";
import Middleware from "../lib/http/decorators/middleware";
import HttpMiddleware from "../lib/http/HttpMiddleware";

@Middleware()
class json implements HttpMiddleware {
  async execute(req: IncomingMessage, res: ServerResponse<IncomingMessage>): Promise<void> {
    res.setHeader("Content-Type", "application/json");
  }
}

export default json;