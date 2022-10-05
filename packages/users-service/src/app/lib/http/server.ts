import { createServer, Server as httpServer } from 'http';
import HttpController from './HttpController';
import HttpError from './HttpError';
import HttpErrorHandler from './HttpErrorHandler';
import HttpRequestHandler from './HttpRequestHandler';
import HttpRouter from './HttpRouter';
import { HttpMethod } from './types';


class ServerClass {

  private static instance: ServerClass | undefined = undefined;

  private readonly _routers = new Map<string, HttpRouter>();

  private readonly _middlewares = new Array<HttpRequestHandler>();
  private _errHandler: HttpErrorHandler = async (error, req, res) => {
    let { status, statusMessage, message } = error as HttpError;
    if (status === undefined) {
      status = 500;
    }
    res.statusCode = status;
    res.end(JSON.stringify({ status, statusMessage, message }));
  }
  
  private constructor() {
    this._routers.set('', new HttpRouter());
  }
  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new this();
    }
    return this.instance;
  }

  bootstrap(): httpServer {

    return createServer(async (req, res) => {

      if (req.url === undefined || req.method === undefined) return;

      try {
        this._middlewares.map(middleware => middleware(req, res));      

        const routers = Array.from(this._routers.keys());
        const triggeredRouters = routers.filter(router_basePath => (req.url as string).startsWith(router_basePath));


        for await (const router of triggeredRouters) {
          if (await (this._routers.get(router) as HttpRouter).handle(req, res)) {
            return;
          };
        }

        res.statusCode = 404;
        res.end(JSON.stringify({ status: 404, message: `Cannot ${req.method} ${req.url}` }))

      } catch (e) {
        this._errHandler((e as Error|HttpError), req, res);
      }

    })
  }

  registerMiddleware(router: string, middleware: HttpRequestHandler) {
    if (router = '') {
      this._middlewares.push(middleware);    
    }
    if (this._routers.get(router) === undefined) {
      this._routers.set(router, new HttpRouter(router));
    }
    (this._routers.get(router) as HttpRouter).use(middleware);
  }
  set errorHandler(errHandler: HttpErrorHandler) {
    this._errHandler = errHandler;
  }
  registerEndpoint(basePath: string, relativePath: string, method: HttpMethod, controller: HttpController) {
    if (this._routers.get(basePath) === undefined) {
      this._routers.set(basePath, new HttpRouter(basePath));
    }
    switch (method) {
      case "GET":
        (this._routers.get(basePath) as HttpRouter).get(relativePath, controller);
        break;
      case "POST":
        (this._routers.get(basePath) as HttpRouter).post(relativePath, controller);
        break;
      case "DELETE":
        (this._routers.get(basePath) as HttpRouter).delete(relativePath, controller);
        break;
      case "PUT":
        (this._routers.get(basePath) as HttpRouter).put(relativePath, controller);
        break;
   }
  }

  

}

export const Server = ServerClass.getInstance();