import { IncomingMessage, ServerResponse } from "http";

export default interface HttpMiddleware {
  execute(req: IncomingMessage, res: ServerResponse<IncomingMessage>): Promise<void> | void
}