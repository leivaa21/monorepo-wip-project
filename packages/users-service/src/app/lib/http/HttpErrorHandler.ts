import { IncomingMessage, ServerResponse } from "http";
import HttpError from "./HttpError";

type HttpErrorHandler = (error: Error|HttpError, req: IncomingMessage, res: ServerResponse<IncomingMessage>) => Promise<void> | void;

export default HttpErrorHandler;