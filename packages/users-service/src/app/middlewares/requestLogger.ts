import { HttpMiddleware, HttpRequest, HttpResponse, Middleware } from "../lib/http";
import logger from "../lib/logger/consoleLogger";

@Middleware()
class RequestLogger implements HttpMiddleware {
  execute(req: HttpRequest, res: HttpResponse): void | Promise<void> {
    const startTime = new Date().getTime();
    logger.info(`Request ${req.method} ${req.url} received\n\t| from ${req.headers["x-forwarded-for"] || req.socket.remoteAddress || undefined} ${req.headers["user-agent"]}`)

    res.on('finish', () => {
      const endTime = new Date().getTime();
      logger.ok(`Request ${req.method} ${req.url} served with\n\t| status: ${res.statusCode} - ${res.statusMessage}\n\t| Response Time: ${endTime - startTime}ms`)
    })
    
  }
}

export default RequestLogger;
