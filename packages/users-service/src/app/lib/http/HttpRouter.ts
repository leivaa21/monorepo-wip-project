import logger from "../logger/consoleLogger";
import HttpController from "./HttpController";
import HttpRequest from "./HttpRequest";
import HttpRequestHandler from "./HttpRequestHandler";
import HttpResponse from "./HttpResponse";
import HttpRoute from "./HttpRoute";
import { HttpMethod } from "./types";

/**
 * Endpoints Mapping =>
 * 
 * UsersRouter "/api/users" = {
 *  "/" = {
 *      "GET": HttpController,
 *      "POST": HttpController,
 *    },
 *  "/:id" = {
 *    "GET": HttpController
 *   },
 * }
 * 
 */
class HttpRouter {
  
  private readonly _endpoints = new Map<string, Map<HttpMethod, HttpController>>();
  private readonly _middlewares = new Array<HttpRequestHandler>();
  private readonly _basePath: string;
  constructor(basePath: string) {
    this._basePath = basePath;
   }
  
  get(path: string, controller: HttpController) {
    this.defineEndpoint(path, "GET", controller);
  }
  post(path: string, controller: HttpController) {
    this.defineEndpoint(path, "POST", controller);
  }
  put(path: string, controller: HttpController) {
    this.defineEndpoint(path, "PUT", controller);
  }
  delete(path: string, controller: HttpController) {
    this.defineEndpoint(path, "DELETE", controller);
  }

  use(middleware: HttpRequestHandler) {
    this._middlewares.push(middleware);
  }

  async handle(req: HttpRequest, res: HttpResponse) {
    const path = req.url as string;
    const method = req.method as HttpMethod;

    /**
     * Middlewares
     */
    this._middlewares.map((middleware) => middleware(req, res))
    /**
     * Routing
     */
    
    
    const relativePaths = Array.from(this._endpoints.keys());
    const triggeredPaths = relativePaths.filter(relativePath => {
      const route = new HttpRoute(`${this._basePath}/${relativePath}`);
      return route.doRouteMatch(path);
    })
    const selectedPath = triggeredPaths[0];
    if (selectedPath === undefined) return false;
    
    const subrouter = (this._endpoints.get(selectedPath) as Map<HttpMethod, HttpController>)
    if (subrouter.has(method)) {
      const route = new HttpRoute(`${this._basePath}/${selectedPath}`)
      const controller = subrouter.get(method);
      await controller?.execute(req, res, route.getParams(req.url as string));
      return true;
    }
    return false;
  }

  private defineEndpoint(path: string, method: HttpMethod, controller: HttpController) {
    
    if (this.isRelativePathUndefined(path)) {
      this._endpoints.set(path, new Map<HttpMethod, HttpController>());
    } 
    if (this.isEndpointAlreadyRegistered(path, method)) {
      throw new Error(`Route ${method} ${this._basePath}${path} is duplicated!`)
    }


    (this._endpoints
      .get(path) as Map<HttpMethod, HttpController>
    ).set(method, controller);
    logger.ok(`Route ${method} ${this._basePath}${path} defined`)
  }

  private isRelativePathUndefined(relativePath: string) {
    return this._endpoints.get(relativePath) === undefined;
  }
  
  private isEndpointAlreadyRegistered(relativePath: string, method: HttpMethod) {
    return (this._endpoints
      .get(relativePath) as Map<HttpMethod, HttpController>
    ).get(method) !== undefined;
  }
}

export default HttpRouter;
