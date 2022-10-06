import { IncomingMessage, ServerResponse } from "http";
import HttpRequest from "./HttpRequest";
import HttpResponse from "./HttpResponse";

interface HttpController {
  execute: (req: HttpRequest, res: HttpResponse, args?: Map<string, string>) => Promise<void> | void
}

export default HttpController;
