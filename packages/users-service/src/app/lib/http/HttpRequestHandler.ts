import HttpRequest from "./HttpRequest";
import HttpResponse from "./HttpResponse";

type HttpRequestHandler = (req: HttpRequest, res: HttpResponse) => Promise<void> | void;

export default HttpRequestHandler;