import HttpRequest from "./HttpRequest";
import HttpResponse from "./HttpResponse";

export default interface HttpMiddleware {
  execute(req: HttpRequest, res: HttpResponse): Promise<void> | void
}