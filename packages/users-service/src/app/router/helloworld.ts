import { IncomingMessage, ServerResponse } from "http";
import Injectable from "../lib/dependencyInjection/decorators/inectable.decorator";
import GET from "../lib/http/decorators/GET";
import HttpController from "../lib/http/HttpController";

@GET()
class HelloWorldEndpoint implements HttpController {
  async execute(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    res.statusCode = 200
    res.end(JSON.stringify({ message: 'Hello World'}))

  };
}

@Injectable()
class HelloWorldService {
  formatMessage(id: string) {
    return 'Hello world! ' + id;
  }
}

@GET({
  path: ':id',
  deps: [HelloWorldService]
})
class HelloCertainIDEndpoint implements HttpController{
  constructor(private readonly service: HelloWorldService) {}
  async execute(req: IncomingMessage, res: ServerResponse<IncomingMessage>, args?: Map<string, string>) {
    if (args === undefined) return;
    if (!args.has('id')) return;

    res.statusCode = 200
    res.end(JSON.stringify({ message: this.service.formatMessage(args.get('id') as string)}))
  };
}

export {HelloWorldEndpoint, HelloCertainIDEndpoint};
