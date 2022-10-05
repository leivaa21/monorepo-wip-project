import { IncomingMessage, ServerResponse } from "http";

interface HttpController {
  execute: (req: IncomingMessage, res: ServerResponse<IncomingMessage>, args?: Map<string, string>) => Promise<void> | void
}

export default HttpController;
