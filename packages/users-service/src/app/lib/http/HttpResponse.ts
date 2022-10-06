import { IncomingMessage, ServerResponse } from "http";

class HttpResponse extends ServerResponse<IncomingMessage>{
  constructor(
    req: IncomingMessage,
  ) { 
    super(req);
  }
  send(status: number, body: {}) {
    this.statusCode = status;
    this.end(JSON.stringify(body));
  }
}

export default HttpResponse;