import { IncomingMessage, ServerResponse } from "http";
import logger from "../logger/consoleLogger";
import HttpController from "./HttpController";
import HttpRequestHandler from "./HttpRequestHandler";
import HttpRoute from "./HttRoute";
import { HttpMethod } from "./types";

type path = string;
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
  
  private readonly _endpoints = new Map<path, Map<HttpMethod, HttpController>>();
  private readonly _middlewares = new Array<HttpRequestHandler>();
  constructor(private readonly _basePath: path = '') { }
  
  get(path: path, controller: HttpController) {
    this.defineEndpoint(path, "GET", controller);
  }
  post(path: path, controller: HttpController) {
    this.defineEndpoint(path, "POST", controller);
  }
  put(path: path, controller: HttpController) {
    this.defineEndpoint(path, "PUT", controller);
  }
  delete(path: path, controller: HttpController) {
    this.defineEndpoint(path, "DELETE", controller);
  }

  use(middleware: HttpRequestHandler) {
    this._middlewares.push(middleware);
  }

  async handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
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

  private defineEndpoint(path: path, method: HttpMethod, controller: HttpController) {
    
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

  private isRelativePathUndefined(relativePath: path) {
    return this._endpoints.get(relativePath) === undefined;
  }
  
  private isEndpointAlreadyRegistered(relativePath: path, method: HttpMethod) {
    return (this._endpoints
      .get(relativePath) as Map<HttpMethod, HttpController>
    ).get(method) !== undefined;
  }
}

export default HttpRouter;
