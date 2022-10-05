import { IncomingMessage, ServerResponse } from "http";

type HttpRequestHandler = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => Promise<void> | void;

export default HttpRequestHandler;