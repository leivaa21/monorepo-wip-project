import { Injectable } from "../lib/dependencyInjection";
import { GET, HttpController, HttpRequest, HttpResponse } from "../lib/http";

@GET()
class HelloWorldEndpoint implements HttpController {
  async execute(req: HttpRequest, res: HttpResponse) {
    res.send(200, {message: 'Hello World!'})
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
  async execute(req: HttpRequest, res: HttpResponse, args?: Map<string, string>) {
    if (args === undefined) return;
    if (!args.has('id')) return;

    res.send(200, {message: this.service.formatMessage(args.get('id') as string)})
  };
}

export {HelloWorldEndpoint, HelloCertainIDEndpoint};
